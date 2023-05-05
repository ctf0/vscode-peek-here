import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('peek_here', async () => {
            const editor = vscode.window.activeTextEditor;

            if (editor) {
                const { selections, selection, document } = editor;
                const uri = document.uri;

                await vscode.commands.executeCommand(
                    'editor.action.peekLocations',
                    uri,
                    selection.active,
                    [...selections.map((item: vscode.Selection) => new vscode.Location(uri, document.lineAt(item.start.line).range))],
                    'peek',
                );
            }
        }),
    );
}

export function deactivate() { }
