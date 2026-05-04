# מסמך ייעוץ ממוקד להעמקת התאמה למשרת Backend / API

## מטרה

מטרת ההמלצה להיום היא למקד את זמן הלמידה בפער המרכזי מול דרישות המשרה: **Backend ו־API**.

למועמדת יש רקע קודם ב־Android, ולכן אין צורך להפנות את עיקר זמן ההעמקה להיבט המובייל. לעומת זאת, בפרויקט הנוכחי ניכר פער מהותי בין צד ה־Frontend החזק לבין שכבת שרת התחלתית יחסית. לכן, ניצול נכון של 3–4 שעות לימוד צריך להתמקד בהבנת הדרך שבה הפרויקט יכול להתקדם ממערכת Web טובה למערכת Backend מלאה, מסודרת וקרובה יותר לסטנדרט של סביבת Production.

## תמונת מצב מקצועית של הפרויקט

הפרויקט בנוי היטב בצד ה־Web עם Next.js, TypeScript, React ו־UI מסודר, אך שכבת השרת עדיין בסיסית.

### נקודות עיקריות

- ה־API הקיים מצומצם ומבוסס בעיקר על קבלת נתונים ושליחת מייל, ללא שכבת domain או persistence אמיתית:
  - [src/app/api/order/route.ts](../src/app/api/order/route.ts)
  - [src/app/api/contact/route.ts](../src/app/api/contact/route.ts)
- אין כרגע מסד נתונים, repository layer, או lifecycle מלא להזמנה. המשמעות היא שאין מערכת backend שמנהלת ישויות, סטטוסים, עדכונים, היסטוריה או הרשאות.
- מסך הניהול אינו נשען על backend אמיתי אלא על מידע מדומה בזיכרון:
  - [src/app/admin/page.tsx](../src/app/admin/page.tsx)
- מודל הנתונים מוגדר ברמת TypeScript בלבד, אך לא ממומש כמודל נתונים של backend:
  - [src/types/index.ts](../src/types/index.ts)
- טופס ההזמנה עדיין לא עובד מול תהליך backend מלא של יצירת הזמנה, שמירה, חישוב, תשלום ומעקב:
  - [src/components/order/order-form.tsx](../src/components/order/order-form.tsx)
- קיימת גישה מקלה מדי לבדיקות build, מאחר שהפרויקט מוגדר להתעלם משגיאות TypeScript ו־ESLint בזמן build:
  - [next.config.ts](../next.config.ts)

## מסקנה מקצועית

הפרויקט כן מדגים יכולות UI, ולידציה, חוויית משתמש ו־TypeScript, אך עדיין לא מדגים מספיק יכולות Backend הנדרשות למשרה: APIs משמעותיים, ארכיטקטורה בצד שרת, ניהול נתונים, אינטגרציות, תשתיות ואמינות מערכת.

לכן, זהו ציר ההעמקה הנכון ביותר להיום.

## נושאי הלימוד המדויקים שכדאי להעמיק בהם היום

### 1. תכנון API נכון ב־Node.js

להבין איך מגדירים endpoints ברורים למערכת הזמנות:
- יצירת הזמנה
- שליפת הזמנה
- עדכון סטטוס
- ביטול הזמנה
- קבלת רשימת הזמנות למסך admin
- סכימות request/response עקביות

### 2. ארכיטקטורת Backend

להעמיק בהפרדה בין route handlers, service layer ו־data access layer.

כרגע הלוגיקה ב־API handlers שטוחה וקצרה מדי. המטרה היא להבין איך לפרק קוד לצורה שמאפשרת scale, בדיקות ותחזוקה.

### 3. עבודה עם מסד נתונים

להבין איך מודל ההזמנה הקיים ב־[src/types/index.ts](../src/types/index.ts) מתורגם למסד נתונים אמיתי.

מומלץ ללמוד על הישויות הבאות:
- Orders
- Customers
- Payments
- OrderStatusHistory

### 4. Authentication ו־Authorization

להבין איך מגנים על אזור admin, איך מבדילים בין משתמש רגיל למנהל, ואיך בודקים הרשאות ברמת API.

### 5. אינטגרציות Backend

להעמיק באינטגרציות אמיתיות:
- ספק תשלומים
- שליחת מיילים
- webhooks
- retries
- idempotency

הקוד הנוכחי רק שולח מייל, ולכן חסר הבסיס של backend מבוסס אינטגרציות.

### 6. תשתיות Backend מודרניות

להכיר שימושים מעשיים ב:
- Redis
- RabbitMQ או queue מקביל
- background jobs
- cache
- rate limiting
- webhook processing

### 7. איכות מערכת ו־Production Readiness

להבין:
- logging
- error handling
- validation
- monitoring
- CI/CD
- build discipline

במיוחד חשוב לשים לב שהפרויקט כרגע לא מחמיר על שגיאות build:
- [next.config.ts](../next.config.ts)

## תוכנית לימוד ממוקדת ל־3–4 שעות

### 1. ניתוח שכבת ה־API הקיימת — 45 דקות

לקרוא את:
- [src/app/api/order/route.ts](../src/app/api/order/route.ts)
- [src/app/api/contact/route.ts](../src/app/api/contact/route.ts)

מטרת הקריאה:
- להבין מה קיים היום
- להבין מה חסר כדי שזה ייחשב backend משמעותי
- לזהות היעדר persistence, business rules, validation בצד שרת וחלוקה לשכבות

### 2. מיפוי מודל הנתונים והזרימה העסקית — 50 דקות

לקרוא את:
- [src/types/index.ts](../src/types/index.ts)
- [src/components/order/order-form.tsx](../src/components/order/order-form.tsx)
- [src/app/admin/page.tsx](../src/app/admin/page.tsx)

מטרת הקריאה:
- להבין אילו ישויות עסקיות כבר מרומזות במערכת
- להבין איך הן אמורות להיראות ב־backend אמיתי
- לחשוב כמו backend engineer על data model, סטטוסים ו־API contracts

### 3. למידת ארכיטקטורת Backend נכונה עבור הפרויקט — 60 דקות

המטרה בשלב הזה היא לנסח לעצמה מבנה רצוי עתידי, למשל:
- routes
- services
- repositories
- schemas
- integrations
- jobs

צריך להבין איך route כמו זה שב־[src/app/api/order/route.ts](../src/app/api/order/route.ts) אמור להפוך לשכבת כניסה בלבד, כאשר הלוגיקה העסקית יושבת בשירותים נפרדים.

### 4. השלמת ידע בתשתיות שחסרות כאן — 35 דקות

להקדיש זמן להבנה ברמה מעשית של:
- Postgres או MongoDB לניהול הזמנות
- Redis ל־cache, rate limiting או session-related workflows
- RabbitMQ או queue אחר למשימות רקע
- webhook processing עבור תשלומים
- logging ו־error monitoring

### 5. סיכום תוצרים מקצועי — 20 דקות

לצאת מהלמידה עם שלוש תובנות ברורות:
- מה חסר בפרויקט כדי להיחשב backend חזק
- אילו שלושה שינויים היו הכי משפרים את ההתאמה למשרה
- אילו מושגים ונושאים היא יכולה לדבר עליהם כבר עכשיו בראיון ברמה בטוחה ומדויקת

## הכוונה מדויקת לפי קבצים

### [src/app/api/order/route.ts](../src/app/api/order/route.ts)

זה הקובץ המרכזי להבנת הפער. הוא מדגים endpoint בסיסי מאוד, אך לא service אמיתי.

כדאי ללמוד ממנו איך לזהות API ראשוני מדי, ומה צריך להוסיף:
- validation
- persistence
- business rules
- error mapping
- integration boundaries

### [src/app/api/contact/route.ts](../src/app/api/contact/route.ts)

זה קובץ דומה שממחיש גישת handler דק, אך לא מספיק בשלה. הוא טוב כדוגמה לכניסה לשרת, אך לא לייצוג backend עשיר.

### [src/components/order/order-form.tsx](../src/components/order/order-form.tsx)

זהו המקום להבין מהו הקלט העסקי של המערכת. ממנו אפשר לגזור:
- חוזה API נכון
- מודל נתונים
- ולידציה server-side
- זרימת הזמנה מלאה

### [src/app/admin/page.tsx](../src/app/admin/page.tsx)

זהו הקובץ שממחיש אילו יכולות backend המערכת אמורה להציע בפועל, אך עדיין לא מציעה:
- חיפוש
- פילטור
- עדכון סטטוס
- שליפת הזמנות
- היסטוריית שינויים

### [src/types/index.ts](../src/types/index.ts)

זה הקובץ הנכון לחשוב דרכו על domain model. כדאי לעבור על ה־Order type ולשאול איך כל שדה מתורגם ל:
- DB schema
- API response
- business rule
- authorization policy

### [next.config.ts](../next.config.ts)

זה קובץ חשוב כדי לזהות בשלות הנדסית. העובדה שמתעלמים משגיאות build היא אינדיקציה לכך שהפרויקט עדיין לא מוקפד ברמת production workflow. כדאי להבין למה זה בעייתי ואיך CI/CD אמור להיראות במקום.

## המלצה מסכמת

אם יש רק 3–4 שעות להשקיע היום, נכון למקד אותן כמעט כולן ב־Backend/API. זהו הפער המקצועי המרכזי בפרויקט ביחס למשרה, וזה גם המקום שבו תוספת ידע תייצר את השיפור הגדול ביותר בהתאמה.

המטרה אינה לכסות את כל עולם ה־backend ביום אחד, אלא לבנות הבנה חדה ומדויקת של המעבר מ־API בסיסי למערכת Node.js מלאה: שכבות ארכיטקטורה, מודל נתונים, אינטגרציות, reliability ותשתיות.