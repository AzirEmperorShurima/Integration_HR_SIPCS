# import requests
# from bs4 import BeautifulSoup
# from urllib.parse import urlparse

# def download_video_from_website(url, output_path):
#     try:
#         # Tải nội dung của trang web
#         response = requests.get(url)
#         if response.status_code == 200:
#             # Sử dụng BeautifulSoup để phân tích mã nguồn trang web
#             soup = BeautifulSoup(response.content, 'html.parser')
#             # Tìm tất cả các thẻ video
#             video_tags = soup.find_all('video')
#             if video_tags:
#                 for i, video_tag in enumerate(video_tags, start=1):
#                     # Trích xuất URL của video từ thuộc tính src của thẻ video
#                     video_url = video_tag.get('src')
#                     if video_url:
#                         # Tạo tên file dựa trên URL của video
#                         video_filename = urlparse(video_url).path.split("/")[-1]
#                         # Tải video
#                         video_response = requests.get(video_url)
#                         if video_response.status_code == 200:
#                             with open(output_path + video_filename, 'wb') as f:
#                                 f.write(video_response.content)
#                             print(f"Downloaded video {i}: {video_filename}")
#                         else:
#                             print(f"Failed to download video {i}")
#             else:
#                 print("No video found on the provided URL.")
#         else:
#             print("Failed to fetch content from the provided URL.")
#     except Exception as e:
#         print(f"An error occurred: {e}")

# if __name__ == "__main__":
#     website_url = input("Enter the URL of the website containing the video you want to download: ")
#     download_path = input("Enter the download path (leave empty for current directory): ").strip()
#     if not download_path:
#         download_path = "./"
#     if not download_path.endswith("/"):
#         download_path += "/"
#     download_video_from_website(website_url, download_path)
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import os
from concurrent.futures import ThreadPoolExecutor

def download_video(video_url, output_path):
    try:
        video_response = requests.get(video_url)
        if video_response.status_code == 200:
            video_filename = urlparse(video_url).path.split("/")[-1]
            with open(output_path + video_filename, 'wb') as f:
                f.write(video_response.content)
            print(f"Downloaded video: {video_filename}")
        else:
            print(f"Failed to download video from {video_url}")
    except Exception as e:
        print(f"An error occurred while downloading {video_url}: {e}")

def download_video_from_website(url, output_path):
    try:
        with requests.Session() as session:
            response = session.get(url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                video_tags = soup.find_all('video')
                if video_tags:
                    with ThreadPoolExecutor(max_workers=5) as executor:
                        for video_tag in video_tags:
                            video_url = video_tag.get('src')
                            if video_url:
                                executor.submit(download_video, video_url, output_path)
                else:
                    print("No video found on the provided URL.")
            else:
                print("Failed to fetch content from the provided URL.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    website_url = input("Enter the URL of the website containing the video you want to download: ")
    download_path = input("Enter the download path (leave empty for current directory): ").strip()
    if not download_path:
        download_path = "./"
    if not download_path.endswith("/"):
        download_path += "/"
    if not os.path.exists(download_path):
        os.makedirs(download_path)
    download_video_from_website(website_url, download_path)

