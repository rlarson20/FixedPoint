# designing the vault representation
# def build_vault_tree(root_path):
#     root = VaultNode(name=os.path.basename(root_path), path=root_path)
#     for entry in os.scandir(root_path):
#         if entry.is_dir():
#             node = build_vault_tree(entry.path)
#         else:
#             node = parse_note_file(entry.path)
#         root.children.append(node)
#     return root
