import time

#  middleware handle the request and respone from the APi and return a output
# that is used for the trigger the request and responce between some data i want to perform then use this one.
# not possible to every time print the some method name and api related info thats why this one use and all over use .


class RequestLoggingMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        start_time = time.time()

        print("================================")
        print("REQUEST STARTED")
        print("Method:", request.method)
        print("Path:", request.path)

        response = self.get_response(request)

        end_time = time.time()

        execution_time = end_time - start_time

        print("Status Code:", response.status_code)
        print("Execution Time:", execution_time)
        print("REQUEST FINISHED")
        print("================================")

        return response
