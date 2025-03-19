# @app.route('/process', methods=['POST'])
# def process_links():
#     data = request.json
#     vault_tree = build_vault_tree(data['vault_path'])
#     results = []
#
#     for link in data['links']:
#         best_match = find_best_note_match(link, vault_tree)
#         if best_match.score >= MIN_CONFIDENCE:
#             update_note(best_match.note_path, link)
#         else:
#             new_note_path = create_note(best_match.folder_path, link)
#         results.append(...)
#
#     return jsonify(results)
