# Relovut

Relovut is an app which allows its users to add funds and send funds between each other, automatically converting from the sender's currency to the recepient's currency. Additionally, a user can add others to a friend list for easier sending of funds, can easily track their incoming and outgoing expenses, and can receive by email (if emails are enabled) a full report with all the transactions that occured in a chosen interval.

_Note: a valid email address is not required to register or use the app if email sending is disabled in the backend. A few details on how to run each app, if needed, are present in the respective folders._

#### Students:

- Șomodi Teodor Cristian
- Vintilă Ionela-Valentina

# AspectJ

The project implements the following six aspects:

- **AddFundsValidator** - validates that the amount of funds a user adds via a request to the proper endpoint is greater than 0, otherwise it returns a `Bad Request` response with an appropriate message
- **CacheableRequest** - for controller methods marked with the `@CacheableRequest(int SecondsUntilExpiry)` annotation, it will intercept the response and cache it for the given duration, returning said response for further requests until the expiration time
- **ControllerExceptionInterceptor** - will intercept any exceptions (apart from `ResponseStatusException`) thrown during the execution of a request and will return an `Internal Server Error` response instead, keeping only the original exception's message
- **ExecTimeTracker** - will log to console the execution time of each request
- **RequestRetryAspect** - will intercept any remote calls done via `RestTemplate.getForObject(String, ..)` and retry them up to 4 times if they throw `RestClientException` (meaning it encountered a client-side HTTP error status code)
- **TransactionsCache** - will automatically cache indefinitely (until application restart) all the GET requests present within the class `TransactionsController`, for the user who has done the requests, and will automatically invalidate the cache if the user does any non-GET request in order for the next GET request to load the new data and then be cached again. It specifically handles the case where a user sends funds to another user, invalidating the caches of both users.
