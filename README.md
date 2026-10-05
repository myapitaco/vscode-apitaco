<div align="center">



# vscode-apitaco

**Bring Claude, GPT, Gemini, DeepSeek, GLM, Kimi and more directly into VS Code with [APITaco.com](https://apitaco.com/).**

One API key. One wallet. Multiple AI models. No monthly AI subscription required.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## AI Coding Without Being Locked to One Model

`vscode-apitaco` connects VS Code to [APITaco.com](https://apitaco.com/), giving developers access to multiple AI model families from a single extension.

Use a powerful Claude or GPT model for difficult coding problems, switch to a faster model for small edits, or test Gemini, DeepSeek, GLM, Kimi and other models without rebuilding your workflow.

Your editor stays the same.

You simply choose the model you want to use.

## Features

- **Ask AI** — open the Command Palette with `Cmd+Shift+P` or `Ctrl+Shift+P` and select `APITaco: Ask AI`
- **Explain Code** — select code, right-click, and choose `APITaco: Explain Selection`
- **Refactor Code** — highlight code and run `APITaco: Refactor Selection`
- **Fix Code** — ask a selected model to find problems and suggest corrections
- **Multi-model support** — use supported Claude, GPT, Gemini, DeepSeek, GLM, Kimi and other models
- **Switch models anytime** — use different models for different coding tasks
- **One APITaco API key** — no need to manage separate API credentials for every supported model family
- **One wallet balance** — fund your APITaco account and use the models you need
- **Pay for usage** — no fixed monthly AI subscription required
- **OpenAI-compatible API support** — easier integration with existing developer tooling

## Why APITaco Inside VS Code?

Most AI coding extensions are built around a single provider or force you into another monthly subscription.

APITaco takes a different approach.

Instead of deciding that one model must handle every programming task, you can choose the model that makes sense for what you are doing.

For example:

```text
Complex architecture      → Claude / GPT
Quick code explanation    → Fast low-cost model
Refactoring               → Claude / GPT / Gemini
Debugging                 → Your preferred reasoning model
Simple repetitive edits   → Lower-cost model
Experimenting             → DeepSeek / GLM / Kimi / others
```

The available catalog changes as new AI models are released, so check [APITaco.com](https://apitaco.com/) for the latest supported models.

## Install

Until the extension is available through the VS Code Marketplace, you can build and install it locally.

```bash
git clone YOUR_VSCODE_APITACO_REPOSITORY
cd vscode-apitaco

npm install
npm run compile

# Build the VSIX package
npx vsce package

# Install it in VS Code
code --install-extension vscode-apitaco-0.1.0.vsix
```

After installation, restart VS Code if the APITaco commands do not immediately appear in the Command Palette.

## Configure

Open:

```text
VS Code
→ Settings
→ Search "APITaco"
```

Configure the extension with your APITaco credentials.

### API Key

```text
APITaco: Api Key
```

Enter the API key from your [APITaco account](https://my.apitaco.com/).

Keep this key private.

Do not commit it to GitHub or include it in public repositories.

### Base URL

```text
APITaco: Base Url
```

Set this to the current API endpoint shown in the [APITaco documentation](https://apitaco.com/).

### Model

```text
APITaco: Model
```

Choose the model you want the extension to use by default.

You can change it whenever you want.

That is the point.

Your VS Code workflow should not be locked to one AI model forever.

## Example Workflow

Highlight some code:

```javascript
async function getUser(id) {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}
```

Right-click and choose:

```text
APITaco: Explain Selection
```

Your selected AI model can explain what the function does, point out possible problems, or suggest improvements.

You can then select the same code again and run:

```text
APITaco: Refactor Selection
```

A different model can be used for the second task if you prefer.

## Why Use This Instead of Paying for Another Coding Subscription?

### Pay for What You Use

Many coding assistants charge a fixed monthly subscription regardless of how much you actually use them.

With APITaco, usage is deducted from your APITaco wallet based on the model and amount of usage.

No need to add another recurring AI subscription just because you want AI assistance inside VS Code.

### Choose the Model Yourself

Different models are good at different things.

A large reasoning model may be useful when debugging a difficult application.

Using that same expensive model to rename a function makes much less sense.

With APITaco you can choose.

```text
Hard task     → stronger model
Small task    → faster model
Cheap task    → lower-cost model
Experiment    → switch models
```

### One API Key

Without a multi-model platform, your development environment can quickly turn into this:

```text
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
DEEPSEEK_API_KEY=
OTHER_PROVIDER_KEY=
ANOTHER_PROVIDER_KEY=
```

With APITaco:

```text
APITACO_API_KEY=
```

One account can provide access to multiple supported AI model families.

### One Wallet

Instead of funding several provider accounts separately, APITaco uses a shared wallet for supported models.

Add credit to your account and choose where you want to spend it.

### No Model Loyalty Required

You do not have to pick a side.

Use Claude when Claude works best.

Use GPT when GPT works best.

Try Gemini.

Try DeepSeek.

Try GLM.

Try Kimi.

Switch again when something better arrives.

Your code editor should work for you, not for an AI provider.

## APITaco vs Traditional AI Coding Extensions

Traditional coding assistants often look like this:

```text
VS Code
   |
   v
One AI Extension
   |
   v
One Provider
   |
   v
One Model Family
```

APITaco can work more like this:

```text
VS Code
   |
   v
vscode-apitaco
   |
   v
APITaco API
   |
   +-- Claude
   |
   +-- GPT
   |
   +-- Gemini
   |
   +-- DeepSeek
   |
   +-- GLM
   |
   +-- Kimi
   |
   +-- Other supported models
```

That gives developers more freedom to decide which model should handle each task.

## Useful Commands

Open the VS Code Command Palette:

```text
Ctrl+Shift+P
```

or on macOS:

```text
Cmd+Shift+P
```

Then search for:

```text
APITaco
```

Available commands can include:

```text
APITaco: Ask AI
APITaco: Explain Selection
APITaco: Refactor Selection
APITaco: Fix Selection
APITaco: Select Model
```

## Suggested Keyboard Shortcuts

You can create your own shortcuts through:

```text
Preferences
→ Keyboard Shortcuts
```

For example:

```json
[
    {
        "key": "ctrl+alt+a",
        "command": "apitaco.ask"
    },
    {
        "key": "ctrl+alt+e",
        "command": "apitaco.explainSelection"
    },
    {
        "key": "ctrl+alt+r",
        "command": "apitaco.refactorSelection"
    }
]
```

Adjust the command IDs to match the current extension implementation.

## Security

Your APITaco API key should be treated like a password.

Do not:

- commit it to Git
- include it in screenshots
- paste it into public issues
- publish it in documentation
- hard-code it inside extensions you distribute

If you accidentally expose an API key, revoke or rotate it from your APITaco account.

## Model Availability

AI models change quickly.

New models appear.

Old models are updated.

Prices change.

Model identifiers can change.

Because of this, this README intentionally does not hard-code a permanent list of supported models.

Visit [APITaco.com](https://apitaco.com/) for the current model catalog and pricing.

## Who Is This For?

`vscode-apitaco` is useful for developers who:

- use AI regularly while coding
- want access to more than one AI provider
- do not want another fixed monthly coding subscription
- want to compare Claude, GPT, Gemini, DeepSeek, GLM, Kimi and other models
- already use APITaco for other AI applications
- want one API key across multiple AI workflows
- want more control over which model handles each task
- prefer usage-based billing

## Build With the Same API Outside VS Code

Your APITaco account does not have to be limited to this extension.

The same API platform can also be used by:

- coding agents
- CLI tools
- web applications
- SaaS products
- internal company tools
- automation scripts
- AI agents
- chat interfaces
- image-generation applications
- video-generation applications
- music-generation workflows

That means your editor can use the same APITaco account as the rest of your AI development stack.

## The Idea Is Simple

You should not need five subscriptions and five API accounts just because you want to experiment with five AI model families.

Use one API platform.

Keep one wallet.

Pick the model you want.

And keep coding.

👉 **Get started at [APITaco.com](https://apitaco.com/)**

👉 **Manage your account at [my.apitaco.com](https://my.apitaco.com/)**

## Related

- [APITaco](https://apitaco.com/) — multi-model AI API platform
- [APITaco Dashboard](https://my.apitaco.com/) — API keys, wallet and account management
- [APITaco Models](https://apitaco.com/) — explore currently available AI models

## License

MIT.
