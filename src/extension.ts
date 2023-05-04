import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('peek_here', async () => {
            const editor = vscode.window.activeTextEditor;

            if (editor) {
                const { selection, document } = editor;
                const uri = document.uri;
                const active = selection.active;

                await vscode.commands.executeCommand(
                    'editor.action.peekLocations',
                    uri,
                    active,
                    [new vscode.Location(uri, document.lineAt(active.line).range)],
                    'peek',
                );
            }
        }),
    );
}

export function deactivate() { }
