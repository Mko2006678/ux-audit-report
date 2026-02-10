# Report URL – Code node (místo Set)

Set node u vás dělá prázdné `reportUrl` a z druhého pole vytváří vnořený objekt. Spolehlivější je **Code node**, který výstup sestaví v kódu.

---

## 1. V n8n

1. **Smaž** node **Report URL** (Set) nebo ho odpoj od flow.
2. Za **Save Report** přidej node **Code** (v sekci Code / Core).
3. Pojmenuj ho např. **Report URL**.
4. **Mode:** Run Once for All Items (nebo Run Once for Each Item – oboje funguje, u jednoho itemu je to stejné).
5. Do editoru vlož tento kód:

```javascript
const item = $input.item.json;
const recordId = item.id || item.fields?.id;
const reportUrl = recordId
  ? `https://ux-audit-report.vercel.app/report.html?recordId=${recordId}`
  : "";

return {
  json: {
    ...item,
    reportUrl
  }
};
```

6. Ulož node.
7. Propoj: **Save Report** → **Report URL** (Code).

---

## 2. Výstup

Výstup bude jeden objekt se všemi poli z Save Report (**id**, **createdTime**, **fields**) a navíc:

- **reportUrl:** `"https://ux-audit-report.vercel.app/report.html?recordId=recjacEEymifIMJI9"`

Žádné vnořené objekty, žádné prázdné pole.

---

## 3. Použití dál

V dalších nodech používej `{{ $json.reportUrl }}` (např. e-mail, Airtable Update).
