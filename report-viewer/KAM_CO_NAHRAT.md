# Kam co nahrát – ux-audit-report (GitHub)

## Co je za bordel

V repozitáři máš **dvě** místa:

| Cesta v repo | K čemu |
|--------------|--------|
| **report-viewer/** (v kořeni) | Starší upload (cca 1 hodina), vedle něj je index.html |
| **AI UX audit/report-viewer/** | Aktuální projekt (poslední commit „Create report.html“) |

**Používej jen jednu:** **AI UX audit/report-viewer**. Sem nahraj report viewer a API. Kořenové `report-viewer` a `index.html` můžeš nechat, nebo později smazat – na funkčnost to nemá vliv, když na Vercelu nastavíš Root Directory (viz dole).

---

## Kam co nahrat – přesně

Vše nahráváš **do složky**  
**AI UX audit/report-viewer**  
(v repo ux-audit-report).

| # | Kam v repozitáři | Co nahrat (z tvého počítače) |
|---|------------------|------------------------------|
| 1 | **AI UX audit/report-viewer/report.html** | soubor `report-viewer/report.html` |
| 2 | **AI UX audit/report-viewer/api/report.js** | soubor `report-viewer/api/report.js` |

(Volatelně: chceš-li mít report i na adrese `/api/report.html`, nahraj ještě **AI UX audit/report-viewer/api/report.html** z `report-viewer/api/report.html`.)

---

## Flow – jen ke zkopírování

**Krok 1 – report.html**

- Repo: **ux-audit-report** → otevři složku **AI UX audit** → otevři **report-viewer**.
- **Add file** → **Create new file**.
- Do názvu souboru napiš: **report.html**
- Do obsahu zkopíruj celý obsah z lokálního souboru:  
  `AI UX audit/report-viewer/report.html`
- Commit: např. „Add report.html do AI UX audit/report-viewer“.

---

**Krok 2 – api/report.js**

- Pořád v **AI UX audit/report-viewer**.
- **Add file** → **Create new file**.
- Do názvu souboru napiš: **api/report.js**  
  (GitHub sám vytvoří složku **api** a do ní soubor **report.js**).
- Do obsahu zkopíruj celý obsah z:  
  `AI UX audit/report-viewer/api/report.js`
- Commit: např. „Add api/report.js“.

---

**Krok 3 – (volitelně) api/report.html**

- V **AI UX audit/report-viewer** → **Add file** → **Create new file**.
- Název: **api/report.html**
- Obsah: zkopíruj z `AI UX audit/report-viewer/api/report.html`.
- Commit: např. „Add api/report.html“.

---

## Vercel – Root Directory

Aby Vercel bral jako kořen projektu složku s reportem a API:

1. Vercel → projekt ux-audit-report → **Settings** → **General**.
2. **Root Directory**: nastav na  
   **AI UX audit/report-viewer**  
   (nechat prázdné = kořen repo, pak by API bylo až v repo root api/, což nechceme).
3. **Save**.

Pak budou adresy:

- Report:  
  `https://<tvoje-domena>.vercel.app/report.html?recordId=recXXX`  
  nebo (pokud jsi nahrál api/report.html):  
  `https://<tvoje-domena>.vercel.app/api/report.html?recordId=recXXX`
- API:  
  `GET https://<tvoje-domena>.vercel.app/api/report?recordId=recXXX`

---

## Shrnutí – kopírovací checklist

- [ ] V GitHubu pracuju jen ve složce **AI UX audit/report-viewer**.
- [ ] Nahraný **report.html** do **AI UX audit/report-viewer/report.html**.
- [ ] Nahraný **api/report.js** do **AI UX audit/report-viewer/api/report.js**.
- [ ] (Volitelně) **api/report.html** do **AI UX audit/report-viewer/api/report.html**.
- [ ] Na Vercelu je **Root Directory** = **AI UX audit/report-viewer**.

Po tom bude jasné, kam co nahrat a odkud se report a API servírují.
