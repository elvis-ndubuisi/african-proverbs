<div style="height:90px;width:90px;margin:auto;overflow:hidden;border-radius:10px;">
    <img src="./public/favicon/android-chrome-512x512.png">
</div>

---

# African Proverbs API

The **[African Proverb API]("https://africanproverbs.vercel.app")** brings you well-curated and unique proverbs unique to different regions in Africa. Not only does the API offers you proverbs in the English language, but it also provides its response in multi-African languages and interpretation.

## REST Endpoints

- **Returns a random proverb object**

```https
https://africanproverbs.render.com/api/proverbs
```

```javascript
fetch('https://africanproverbs.render.com/api/proverbs'){
    respose.data;
}
```

- **Returns a random proverb object filtered by country or native language**

```https
https://africanproverbs.render.com/api/proverbs
```

- **Returns a cached proverb object. _This only returns a different proverb object after 24hrs_**

```https
https://africanproverbs.render.com/api/proverbs
```

## GraphQL Query

https://africanproverbs.render.com/api/graphql

## Admin Page

The African Proverbs API has an admin-only web app for registered users who contributes to the proverbs' codebase. To join the admin group you can [register on the admin web app]('https://africanproverbs-admin.vercel.app/') an verify your account.
