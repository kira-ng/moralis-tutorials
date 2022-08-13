# Web3 Authentication

https://docs.moralis.io/docs/web3-authentication

## NextJS Web3 Auth
This tutorial will teach you how Moralis Authentication works and demonstrate how to add secure authentication to your NextJS application by walking you through the creation of a server-side authentication using the popular next-auth NextJS library.

After web3 wallet authentication, the next-auth library creates a session cookie with an encrypted JWT (JWE) stored inside. It contains session info (such as an address, signed message, and expiration time) in the user's browser. It's a secure way to store users' info without a database, it's impossible to read/modify the JWT without a secret key.

##  Why use Web3 Authentication?
1. Starting a new project and need to login users via their wallets?
2. Have an existing Web2 user database you want to connect using Web3 authentication?
3. Want to use authentication aggregators like Auth0 for your enterprise’s Web3 authentication flows?

If the answer to any of these questions is yes, then the Moralis Web3 Auth API is just what you’re looking for!

## With the Moralis Web3 Auth API, you don’t need to:
1. Redirect the user to third party auth interfaces
2. Understand web3 authentication flows
3. Learn how wallets sign or verify messages
4. Master varying wallet standards
5. Discover how wallets work on different blockchains
6. Assume responsibility for the auth solution’s security
7. Constantly update and maintain the auth solution

## Full control
You control everything.

All data is returned to your backend so that you can store it and handle it fully independently.

All user profiles and identities are returned to you and you are not depending on a third party provider for anything.

## How it works
1. Your client requests a sign-in challenge
2. Your server requests a challenge from Moralis Auth API and 3. passes it to the client
3. The client signs the message and passes it to your server for verification
4. Your server verifies the challenge with Moralis
5. Read the full Moralis Auth API reference.
