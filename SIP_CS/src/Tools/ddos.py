import requests
import threading


def send_request(url):
    try:
        response = requests.get(url)
        print(f"Response Code: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")


def run_ddos_test(url, num_requests):
    threads = []
    for _ in range(num_requests):
        thread = threading.Thread(target=send_request, args=(url,))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()


if __name__ == "__main__":
    target_url = "http://localhost:10000/private_Service"
    number_of_requests = 3
    run_ddos_test(target_url, number_of_requests)
