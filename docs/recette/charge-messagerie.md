# Tests de charge de la messagerie

## Objectif
Vérifier que la messagerie avec le conseiller tient 500 conversations simultanées sans dégradation visible.

## Scénario
- 500 assurés connectés, chacun dans sa conversation.
- Chaque assuré envoie un message toutes les 20 secondes pendant 15 minutes.
- 10 conseillers répondent en parallèle.
- Outil : script de charge lancé depuis un poste de recette vers l'environnement de recette.

## Seuils
| Mesure | Seuil acceptable |
|--------|------------------|
| Envoi d'un message (95e centile) | moins de 800 ms |
| Affichage d'une conversation (95e centile) | moins de 1,2 s |
| Erreurs | moins de 0,5 % |
| Messages perdus | aucun |

## Résultats
| Mesure | Résultat |
|--------|----------|
| Envoi d'un message (95e centile) | 540 ms |
| Affichage d'une conversation (95e centile) | 910 ms |
| Erreurs | 0,2 % |
| Messages perdus | 0 |

## Constats
- Le seuil est tenu, mais l'affichage ralentit au-delà de 300 messages dans une conversation : prévoir la pagination.
- Les 0,2 % d'erreurs sont des délais dépassés pendant la montée en charge, sans perte de message.

## Suite
Rejouer le test après la mise en place de la pagination.
