# 404 u odkazu na report – co zkontrolovat

Odkaz `https://ux-audit-report.vercel.app/report.html?recordId=...` vrací 404. Níže body, které ověřit.

---

## 1. Správná doména projektu

- V **Vercel** → tvůj projekt → záložka **Settings** nebo **Domains**.
- Zkontroluj **Production Domain**. Může být např.:
  - `ux-audit-report.vercel.app`
  - nebo `report-viewer-xxxxx.vercel.app` (náhodný suffix).
- Odkaz v n8n a v prohlížeči musí používat **přesně tuto doménu**. Pokud je doména jiná než `ux-audit-report.vercel.app`, v Code node v n8n změň URL na tu, kterou Vercel ukazuje.

---

## 2. Je v deployi soubor `report.html`?

- Vercel → projekt → **Deployments** → otevři **poslední deployment**.
- V přehledu deploye bývá seznam souborů nebo odkaz na prohlížení buildu. Ověř, že v **kořeni** projektu je soubor **report.html** (ne jen ve složce, která se nedeployuje).
- Pokud jsi na GitHubu nahrál soubory do **podsložky** (např. `report-viewer/`), na Vercelu musí být v **Root Directory** nastavená tato složka (Settings → General → Root Directory = `report-viewer`). Pak bude URL stále `...vercel.app/report.html` (kořen deploye = obsah `report-viewer`).

---

## 3. Zkus jen doménu bez cesty

- Otevři v prohlížeči: **https://TVA-DOMENA.vercel.app/**  
  (např. `https://ux-audit-report.vercel.app/`).
- Pokud i tohle dá **404**, projekt na této doméně neběží nebo je doména špatně – ověř v kroku 1.
- Pokud **/ funguje** (např. stránka z index.html), ale **/report.html** dá 404, chybí v deployi soubor `report.html` – ověř v kroku 2 (Root Directory, struktura repo).

---

## 4. Po úpravě znovu nasadit

- Po změně **Root Directory** nebo obsahu repozitáře v Vercelu spusť **Redeploy** (Deployments → ⋯ u posledního deploye → Redeploy).
- Po redeployi zkus znovu:  
  `https://TVA-DOMENA.vercel.app/report.html?recordId=recjacEEymifIMJI9`

---

## 5. Upravit URL v n8n (Code node Report URL)

Pokud zjistíš, že správná doména je jiná (např. `report-viewer-abc123.vercel.app`), v node **Report URL** (Code) změň řádek s URL na:

```javascript
const reportUrl = recordId
  ? `https://TVA-SKUTECNA-DOMENA.vercel.app/report.html?recordId=${recordId}`
  : "";
```

(Ulož workflow a při dalším běhu se bude generovat správný odkaz.)

---

## Shrnutí

| Kontrola | Co udělat |
|----------|------------|
| Doména | Vercel → projekt → Settings/Domains → zkopírovat Production Domain a použít ji v odkaze. |
| report.html v deployi | Root Directory = složka, kde je report.html; Redeploy; zkusit /report.html. |
| Odkaz v n8n | V Code node Report URL mít v řetězci správnou doménu. |

Nejčastější příčina 404: **špatná doména** (projekt má jinou než ux-audit-report.vercel.app) nebo **report.html není v kořeni deploye** (špatné Root Directory).
