@AGENTS.md

## Repozytorium

Ten katalog (`old_projstog/my-app`) jest rootem repo git podpiętego do
`https://github.com/oscargrzywa/projstog.git`, branch `main`.

Wszystkie nowe pliki tworzone w ramach projektu trafiają tutaj — nie poza root repo.

## Workflow: commit + push na bieżąco

Po każdej zakończonej zmianie (nowy plik, poprawka, feature):

1. `git add` zmienionych plików
2. `git commit` z opisową wiadomością
3. `git push origin main`

Nie czekać z commitem na koniec sesji — commitować i pushować inkrementalnie,
po każdej samodzielnej całości. Nie pytać za każdym razem o zgodę na commit/push;
to jest domyślny tryb pracy ustalony przez użytkownika.

## Subagenci

Używać subagentów (Agent tool) tam, gdzie to faktycznie pomaga: równoległe
niezależne zadania, szerokie przeszukiwanie kodu, research. Nie forsować ich
przy prostych, jednoplikowych zmianach.

## Język

Odpowiedzi do użytkownika po polsku.
