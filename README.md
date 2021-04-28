# Corrupt User App Resources
## The Issue
We've noticed that user app resources can sometimes get into a state where they are no longer reported as existing, but we are prevented from creating a new resource with the same name (the API reports that it already exists). We are also prevented from removing the resource (the API reports that it does NOT exist).

There is nothing we can do to recover from this state.

## Running the Demonstration Code
1. Run `npm i` to install dependencies.
1. Rename the `.env-example` file to `.env`.
1. Supply the credentials in `.env`. We will provide them through a secure channel.
1. Run the following command:
```
node index.js
```

## Example Output

```
CURRENT USER RESOURCES
[
  '-KOikkCXTvVZUFAwQFWHQ.json',
  '518xhxqoYpmZKB7COUTGy.json',
  '6HPQQ0Qj-jJhlat8ZtQWd.json',
  'user_settings.json'
]
NO ENTRY FOR hub-user-settings.json
TRY ADDING hub-user-settings.json
ERROR: COM_1169: A resource with the specified key already exists for the user.
TRY REMOVING hub-user-settings.json
ERROR: COM_1177: User resource does not exist or is inaccessible.
```
