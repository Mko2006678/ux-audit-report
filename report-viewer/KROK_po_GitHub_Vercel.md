# Další kroky: repozitář na GitHubu → deploy na Vercel

GitHub i Vercel máte. Teď je potřeba **vytvořit repozitář**, **nahrát do něj kód** a **na Vercelu ho importovat**.

---

## Krok 1: Vytvořit repozitář na GitHubu

1. Na GitHubu klikni **Create repository** (zelené tlačítko) nebo **+** → **New repository**.
2. **Repository name:** např. `ux-audit-report` nebo `report-viewer`.
3. **Public**, **Add a README** můžeš nechat zatím nezaškrtnuté (soubor README už máš ve složce).
4. Klikni **Create repository**.

---

## Krok 2: Nahrát kód do repozitáře (z počítače)

Potřebuješ z počítače poslat obsah složky **`report-viewer`** (api/report.js, report.html, README.md) do tohoto repozitáře.

### Varianta A: Přes GitHub web (bez Gitu v terminálu)

1. Na stránce nového repozitáře (je prázdný nebo jen s README) klikni **uploading an existing file** nebo **Add file** → **Upload files**.
2. Přetáhni do prohlížeče **všechny soubory a složky** z `report-viewer`:
   - složku **api** (s souborem **report.js** uvnitř),
   - soubor **report.html**,
   - soubor **README.md**.
3. Dole zadej commit message (např. „Initial report viewer“) a klikni **Commit changes**.

### Varianta B: Přes Git v terminálu

V terminálu (v adresáři, kde je složka s projektem):

```bash
cd "/Users/applelevne/Documents/sarumanovo/AI/AI UX audit/report-viewer"
git init
git add api/report.js report.html README.md
git commit -m "Initial report viewer"
git branch -M main
git remote add origin https://github.com/Mko2006678/NAZEV_REPO.git
git push -u origin main
```

*(NAZEV_REPO nahraď skutečným názvem repozitáře, např. `ux-audit-report`. Pokud GitHub vyžaduje přihlášení, použij osobní přístupový token místo hesla.)*

---

## Krok 3: Import repozitáře na Vercelu

1. Na Vercelu u „Let's build something new“ v sekci **Import Git Repository** by se po chvíli měl objevit tvůj nový repozitář (po obnovení stránky nebo po propojení účtu).
2. Pokud repozitář **nevidíš:**  
   **Settings** (Vercel) → **Git** → zkontroluj, že je propojený účet GitHub (Mko2006678) a že Vercel má přístup k repozitářům.
3. Klikni na **název repozitáře** (např. ux-audit-report).
4. **Configure Project:**
   - **Root Directory:** Pokud jsi nahrál **jen obsah** složky report-viewer (api + report.html v kořeni repo), nech prázdné. Pokud je v repo složka `report-viewer` a v ní api + report.html, zadej `report-viewer`.
   - **Framework Preset:** None (nebo Leave as is).
5. **Environment Variables** zatím přeskoč (přidáš v Kroku 4).
6. Klikni **Deploy**.

---

## Krok 4: Environment Variables na Vercelu

1. Po deployi (i když první běh může skončit bez env) otevři projekt na Vercelu → **Settings** → **Environment Variables**.
2. Přidej:
   - **Key:** `AIRTABLE_API_KEY`  
     **Value:** tvůj Airtable Personal Access Token
   - **Key:** `AIRTABLE_BASE_ID`  
     **Value:** ID base UX AI Audit (např. z URL Airtable: `airtable.com/appXXXXXXXX...` → `appXXXXXXXX...`)
3. **Save**.
4. **Deployments** → u posledního deploye **⋯** → **Redeploy**, aby se proměnné načetly.

---

## Krok 5: Otestovat

Odkaz na report:  
`https://TVA-PROJEKT.vercel.app/report.html?recordId=REC_ID`  

(REC_ID nahraď skutečným ID záznamu z Airtable tabulky Reports – např. z výstupu n8n Save Report.)

Otevři v prohlížeči – měl by se načíst report a tlačítko „Stáhnout PDF“.

---

## Shrnutí

1. **GitHub:** Create repository → nahraj obsah `report-viewer` (api/, report.html, README.md).
2. **Vercel:** Import Git Repository → vyber repo → Root Directory podle struktury → Deploy.
3. **Vercel:** Settings → Environment Variables → přidej AIRTABLE_API_KEY a AIRTABLE_BASE_ID → Redeploy.
4. **Test:** Otevři `/report.html?recordId=recXXX`.

Pokud u kroku 2 nebo 3 něco nepůjde (např. Vercel stále nevidí repozitář), napiš, na které obrazovce jsi a co přesně vidíš.
