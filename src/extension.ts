import * as vscode from "vscode"

interface AnthropicMessage {
  role: "user" | "assistant"
  content: string
}

interface AnthropicResponse {
  content?: Array<{ type: string; text?: string }>
}

function getConfig() {
  const cfg = vscode.workspace.getConfiguration("apitaco")
  return {
    apiKey: cfg.get<string>("apiKey") ?? "",
    baseUrl: cfg.get<string>("baseUrl") ?? "https://api.apitaco.com/v1",
    model: cfg.get<string>("model") ?? "claude-sonnet-4.6",
  }
}

async function callClaude(prompt: string): Promise<string> {
  const { apiKey, baseUrl, model } = getConfig()
  if (!apiKey) {
    throw new Error(
      "Apitaco API key not set. Open Settings → Apitaco → API Key.",
    )
  }

  const messages: AnthropicMessage[] = [{ role: "user", content: prompt }]

  const res = await fetch(`${baseUrl}/messages`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      messages,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Apitaco API ${res.status}: ${body}`)
  }

  const data = (await res.json()) as AnthropicResponse
  const text = data.content
    ?.filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("\n")
  return text ?? "(empty response)"
}

async function showResult(title: string, content: string) {
  const doc = await vscode.workspace.openTextDocument({
    content,
    language: "markdown",
  })
  await vscode.window.showTextDocument(doc, { preview: true })
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("apitaco.ask", async () => {
      const prompt = await vscode.window.showInputBox({
        prompt: "Ask Apitaco",
        placeHolder: "e.g. write a Python function that flattens a nested list",
      })
      if (!prompt) return
      try {
        const result = await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Apitaco thinking...",
          },
          () => callClaude(prompt),
        )
        await showResult("Apitaco", `# Prompt\n\n${prompt}\n\n# Response\n\n${result}`)
      } catch (err) {
        vscode.window.showErrorMessage(
          err instanceof Error ? err.message : String(err),
        )
      }
    }),

    vscode.commands.registerCommand("apitaco.explainSelection", async () => {
      const ed = vscode.window.activeTextEditor
      if (!ed) return
      const sel = ed.document.getText(ed.selection)
      if (!sel.trim()) {
        vscode.window.showWarningMessage("Select some code first.")
        return
      }
      const lang = ed.document.languageId
      try {
        const result = await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Apitaco explaining...",
          },
          () =>
            callClaude(
              `Explain what this ${lang} code does. Be concise:\n\n\`\`\`${lang}\n${sel}\n\`\`\``,
            ),
        )
        await showResult("Explain", result)
      } catch (err) {
        vscode.window.showErrorMessage(
          err instanceof Error ? err.message : String(err),
        )
      }
    }),

    vscode.commands.registerCommand("apitaco.refactorSelection", async () => {
      const ed = vscode.window.activeTextEditor
      if (!ed) return
      const sel = ed.document.getText(ed.selection)
      if (!sel.trim()) {
        vscode.window.showWarningMessage("Select some code first.")
        return
      }
      const lang = ed.document.languageId
      const goal = await vscode.window.showInputBox({
        prompt: "Refactor goal",
        placeHolder: "e.g. simplify, add types, extract helpers",
      })
      if (!goal) return
      try {
        const result = await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Apitaco refactoring...",
          },
          () =>
            callClaude(
              `Refactor this ${lang} code. Goal: ${goal}.\nReturn only the refactored code in a single fenced block, no commentary.\n\n\`\`\`${lang}\n${sel}\n\`\`\``,
            ),
        )
        // try to extract first fenced block
        const match = /```[a-z0-9_-]*\n([\s\S]*?)\n```/i.exec(result)
        const newCode = match ? match[1] : result
        await ed.edit((eb) => eb.replace(ed.selection, newCode))
      } catch (err) {
        vscode.window.showErrorMessage(
          err instanceof Error ? err.message : String(err),
        )
      }
    }),
  )
}

export function deactivate() {}
