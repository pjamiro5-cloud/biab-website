# Waitlist → Google Sheet einrichten

Jede Anmeldung auf biab.ch landet als neue Zeile in einem Google Sheet. Bei Duo werden beide Personen gemeinsam in einer Zeile gespeichert.
Dauer: ca. 10 Minuten, einmalig.

## 1. Sheet und Script anlegen

1. Neues Google Sheet erstellen, z. B. **„BIAB Waitlist“**.
2. Im Sheet: **Erweiterungen → Apps Script**.
3. Den Inhalt von `Code.gs` löschen und den kompletten Inhalt von `waitlist.gs` (in diesem Ordner) einfügen. Speichern.

## 2. Geheimen Schlüssel setzen

Der Schlüssel sorgt dafür, dass nur eure Website ins Sheet schreiben kann.

1. Im Apps-Script-Editor links auf **Projekteinstellungen** (Zahnrad).
2. Ganz unten **Skripteigenschaften → Skripteigenschaft hinzufügen**.
3. Eigenschaft: `SECRET`, Wert: ein langer Zufallswert (mindestens 32 Zeichen, z. B. aus einem Passwort-Generator). Speichern.

## 3. Einmal testen

1. Im Editor oben die Funktion **`setup`** auswählen und **Ausführen** klicken.
2. Google fragt nach Berechtigungen → mit deinem Konto bestätigen.
3. Im Sheet erscheint jetzt der Tab **„Waitlist“** mit den Spaltenüberschriften.

## 4. Als Web-App veröffentlichen

1. **Bereitstellen → Neue Bereitstellung**.
2. Typ: **Web-App**.
3. Ausführen als: **Ich**. Zugriff: **Jeder**.
4. **Bereitstellen** → die **Web-App-URL** kopieren (endet auf `/exec`).

## 5. Website verbinden

Zwei Umgebungsvariablen setzen:

```
WAITLIST_WEBHOOK_URL=<die Web-App-URL aus Schritt 4>
WAITLIST_SECRET=<derselbe Wert wie SECRET aus Schritt 2>
```

- **Lokal:** Datei `.env.local` im Projektordner anlegen (Vorlage: `.env.example`), dann `npm run dev` neu starten.
- **Vercel:** Project → Settings → Environment Variables → beide eintragen → neu deployen.

Ohne diese Variablen funktioniert das Formular lokal trotzdem: Die Anmeldung wird dann nur im Terminal angezeigt. Auf der Live-Seite zeigt das Formular ohne Verbindung eine Fehlermeldung, damit keine Anmeldung verloren geht.

## Was gespeichert wird

Zeitpunkt, Vorname, Nachname, E-Mail, Land, Ländercode, Telefon (optional, international, z. B. `+41791234567`), Solo/Duo/unsicher, „Wo von uns gehört“, Einwilligung, UTM-Parameter (utm_source, utm_medium, utm_campaign, utm_content, utm_term), Referrer, Einstiegsseite, Browsersprache.

Tipp für das Marketing: Links in Anzeigen mit UTM-Parametern versehen, z. B.
`https://biab.ch/waitlist?utm_source=instagram&utm_medium=paid&utm_campaign=launch-2027`.
Dann sieht man im Sheet pro Anmeldung, welche Kampagne sie gebracht hat.

## Duo-Anmeldungen

- Bei Auswahl von Duo sind Vorname, Nachname, eigene E-Mail-Adresse, Land und Einverständnis für beide Personen erforderlich. Beide Telefonnummern bleiben optional.
- Die zweite Person wird in sieben zusätzlichen Partner-Spalten gespeichert. Beim ersten Aufruf ergänzt die aktualisierte Script-Version diese Spalten, ohne bestehende Zeilen zu verschieben.
- Eine bestehende Solo-Anmeldung kann mit derselben Haupt-E-Mail zu Duo erweitert werden. Ursprünglicher Zeitpunkt und Kampagnenzuordnung bleiben erhalten.
- E-Mail-Adressen werden in beiden Kontaktspalten auf Duplikate geprüft. Wiederholte Anmeldungen desselben Duos erzeugen keine zweite Zeile. Gehört eine Adresse schon zu einer anderen Anmeldung, wird nichts überschrieben; das Formular verweist auf hello@biab.ch.
- Wichtig vor Veröffentlichung der Website: Die neue Version von `waitlist.gs` im Apps-Script-Editor übernehmen und die bestehende Web-App-Bereitstellung aktualisieren. Nur die lokale Website zu ändern reicht für die zusätzlichen Spalten nicht aus.
- Die Website akzeptiert eine Duo-Anmeldung erst dann als erfolgreich, wenn das Script die Speicherung beider Kontakte bestätigt. Eine alte Script-Version löst eine Fehlermeldung aus, statt die zweite Person unbemerkt zu verlieren.
- Bei späterer Anbindung des Newsletter-Tools beide E-Mail-Spalten samt jeweiligem Einverständnis berücksichtigen.

## Hinweise

- Meldet sich dieselbe E-Mail zweimal an, entsteht keine zweite Zeile.
- Wird das Script geändert: **Bereitstellen → Bereitstellungen verwalten → Bearbeiten → Neue Version**. Die URL bleibt gleich.
