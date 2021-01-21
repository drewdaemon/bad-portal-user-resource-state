# Portal API Access Level Latency Demonstration
## The Issue
We've noticed that there is a latency between receiving a confirmation of an update to an item's access and having that new access level reflected on the item (at least when the item is loaded through the search endpoint--haven't yet tested others).

This demonstration code attempts to toggle six items between `public` and `org` access levels. It illustrates that when the items are requested immediately after we receive a "success" response from all the sharing calls, the item access levels are often out-of-date.

However, when given a one-second delay before requesting the updated items the access levels are correct.

## Running the Demonstration Code
1. Run `npm i` to install dependencies.
1. Rename the `.env-example` file to `.env`.
1. Supply the item owner's credentials in the new `.env`. We will provide them through a secure channel.
1. Run the following command:
```
node index.js
```

## Example Output

```
TEST 1
-------------------------------------------

Here's how the items are now.

12d7b2a7bdc84e3885d20ffa0784b5dd: public
be31b2c465834508b8937737e12cc570: public
51bfd3e2b5bc4c6c87a08fc19e152c81: public
0144b5e434484221a4cef2a88078c7e7: public
beca445f5d114fae8b2ff154ea33739a: public
7eec561b24c843e5b49aca585000e0be: public

Setting all items to ORG

DONE!

Requesting items again immediately.

12d7b2a7bdc84e3885d20ffa0784b5dd: public
be31b2c465834508b8937737e12cc570: public
51bfd3e2b5bc4c6c87a08fc19e152c81: public
0144b5e434484221a4cef2a88078c7e7: public
beca445f5d114fae8b2ff154ea33739a: public
7eec561b24c843e5b49aca585000e0be: public

Requesting items again after a pause.

12d7b2a7bdc84e3885d20ffa0784b5dd: org
be31b2c465834508b8937737e12cc570: org
51bfd3e2b5bc4c6c87a08fc19e152c81: org
0144b5e434484221a4cef2a88078c7e7: org
beca445f5d114fae8b2ff154ea33739a: org
7eec561b24c843e5b49aca585000e0be: org
```
