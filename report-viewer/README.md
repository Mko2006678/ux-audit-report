# Report Viewer – zobrazení UX audit reportu v prohlížeči

Stránka načte report z Airtable podle `recordId` a zobrazí ho s definovaným designem. Tlačítko „Stáhnout PDF“ spustí tisk (Uložit jako PDF).

---

## Flow krok po kroku

### Krok 1: Připravit kód (už hotovo)

Ve složce `report-viewer` máte:

- **`api/report.js`** – serverless funkce: načte z Airtable záznam z tabulky Reports podle `recordId` a vrátí JSON (`reportHtml`, `name`, `projectCode`).
- **`report.html`** – stránka: z URL přečte `recordId`, zavolá `/api/report?recordId=...`, zobrazí report a tlačítko „Stáhnout PDF“.

---

### Krok 2: Účet na Vercelu

1. Otevři **https://vercel.com**.
2. **Sign Up** (např. přes GitHub).
3. Po přihlášení jsi na dashboardu.

---

### Krok 3: Nový projekt z této složky

1. Na Vercelu: **Add New…** → **Project**.
2. **Import Git Repository:**
   - Pokud máš `report-viewer` v GitHub repozitáři: vyber repo a jako **Root Directory** zadej cestu ke složce `report-viewer` (např. `AI UX audit/report-viewer` nebo jen `report-viewer`, podle struktury repo).
   - Pokud repozitář ještě nemáš:
     - V počítači ve složce nad `report-viewer` spusť `git init`, přidej soubory, commitni, vytvoř repo na GitHubu a pushni.
     - Na Vercelu pak **Import** tento repo a nastav **Root Directory** na složku, která obsahuje `api` a `report.html` (tj. obsah `report-viewer` musí být kořen deploye).
3. **Deploy:** Klikni **Deploy**. Po prvním deployi může být stránka ještě bez env proměnných – přidáš je v Kroku 4 a pak **Redeploy**.

---

### Krok 4: Proměnné prostředí (Airtable)

1. V projektu na Vercelu otevři **Settings** → **Environment Variables**.
2. Přidej:
   - **Key:** `AIRTABLE_API_KEY`  
     **Value:** tvůj Airtable Personal Access Token (s právy čtení na base UX AI Audit).
   - **Key:** `AIRTABLE_BASE_ID`  
     **Value:** ID base (v URL Airtable je to část za `airtable.com/` – např. `appXXXXXXXXXXXXXX`).
3. Ulož.
4. V záložce **Deployments** vyber poslední deployment → **⋯** → **Redeploy**, aby se proměnné načetly.

---

### Krok 5: Ověření URL

1. Po deployi Vercel zobrazí **doménu** projektu (např. `report-viewer-xxx.vercel.app` nebo vlastní název).
2. **Odkaz na report** má tvar:  
   `https://TVA-DOMENA.vercel.app/report.html?recordId=REC_ID`  
   Např.: `https://ux-audit-report.vercel.app/report.html?recordId=recAbc123XYZ`
3. **REC_ID** získáš z Airtable (tabulka Reports → otevři záznam → v URL nebo v detailu uvidíš `rec...`) nebo z výstupu n8n nodu **Save Report** (pole `id`).

---

### Krok 6: Test v prohlížeči

1. Otevři v prohlížeči:  
   `https://TVA-DOMENA.vercel.app/report.html?recordId=REC_ID_SKUTECNEHO_REPORTU`
2. Měl by se načíst report (Report HTML z Airtable) a zobrazit tlačítko „Stáhnout PDF“.
3. Klikni **Stáhnout PDF** → měl by se otevřít dialog tisku → zvol **Uložit jako PDF**.

---

### Krok 7: Odkaz v n8n (volitelně)

Po **Save Report** v n8n máš ve výstupu `id` vytvořeného záznamu (např. `id: "recXXXXXXXXXXXXXX"`). V dalším nodu (např. **Set** nebo **Send Email**) sestav odkaz:

- Hodnota:  
  `https://TVA-DOMENA.vercel.app/report.html?recordId=` + výstupní `id` z Save Report (např. `{{ $json.id }}`).

Tento odkaz pak pošli e‑mailem nebo ulož do Airtable (pole typu URL).

---

## Struktura souborů (kořen = to, co deployuješ)

```
report-viewer/
  api/
    report.js    → GET /api/report?recordId=recXXX
  report.html    → /report.html?recordId=recXXX
  README.md
```

---

## Troubleshooting

- **„Report nebyl nalezen“** – zkontroluj, že `recordId` je správné (začíná na `rec`) a že záznam existuje v tabulce Reports v dané base.
- **„Server config: AIRTABLE_API_KEY not set“** – doplň Environment Variables a udělej Redeploy.
- **Prázdná stránka / žádný obsah** – v Airtable u daného záznamu vyplň pole **Report HTML**. API vrací právě toto pole.
