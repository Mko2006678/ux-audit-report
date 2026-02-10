# Oprava: doména a chybějící report.html v deployi

---

## 1. Project name vs. odkaz

**Project name** v Vercelu (`ux-audit-report`) nemusí být stejné jako **adresa**, na které stránka běží. Adresa závisí na **Domains** u projektu.

- V projektu **ux-audit-report** otevři **Settings** → **Domains** (nebo **Overview** → sekce Domains).
- Zkopíruj **Production Domain** – může být např.:
  - `ux-audit-report.vercel.app`
  - nebo `ux-audit-report-mko2006678s-projects.vercel.app` (projekt v rámci týmu)
- Odkaz na report musí používat **přesně tuto doménu**:  
  `https://TA-DOMENA/report.html?recordId=recXXX`

---

## 2. Proč 404 – v deployi je jen index.html

Z toho, co píšeš, v aktuálním deployi (commit b387ac2) je **jen index.html**. Chybí:

- **report.html** – stránka, která zobrazuje report
- **api/report.js** – API, které načítá report z Airtable

Bez nich Vercel na cestě `/report.html` nic nenajde → 404.

**Řešení:** Do **stejného GitHub repozitáře** (ux-audit-report) doplň:

1. **report.html** – v kořeni repo (vedle index.html)
2. Složku **api** a v ní soubor **report.js**

Pak v repozitáři pushni změny (nebo nahraj soubory přes GitHub web). Vercel udělá nový deploy a v něm už budou i `report.html` a `api/report.js`.

---

## 3. Kontrola po nahrání

- Po novém deployi otevři **Domains** a zkopíruj Production Domain.
- Zkus: `https://TA-DOMENA.vercel.app/report.html?recordId=recjacEEymifIMJI9`
- Pokud stále 404, v **Deployments** u posledního deploye zkontroluj, že v přehledu souborů jsou **report.html** a **api/report.js**.

---

## 4. Úprava odkazu v n8n (Code node Report URL)

Až budeš mít správnou doménu (z Vercel → Domains), v Code node **Report URL** nastav:

```javascript
const reportUrl = recordId
  ? `https://TA-SKUTECNA-DOMENA/report.html?recordId=${recordId}`
  : "";
```

(Bez koncového lomítka, TA-SKUTECNA-DOMENA = hodnota z Vercel Domains, např. `ux-audit-report.vercel.app`.)

---

## Shrnutí

| Problém | Řešení |
|--------|--------|
| Odkaz neshoduje s projektem | Použij doménu z Vercel → Settings → Domains (Production Domain). |
| 404 na /report.html | Do repo doplň **report.html** a **api/report.js**, pushni, počkej na nový deploy. |
| Odkaz v n8n | V Code node Report URL použij správnou doménu z Domains. |

Soubory **report.html** a **api/report.js** máte v projektu v složce `AI UX audit/report-viewer/` – ty nahrajte do GitHub repozitáře **ux-audit-report** (do kořene: report.html a složka api s report.js).
