import pyodbc

# Thiết lập kết nối với SQL Server
conn = pyodbc.connect('DRIVER={SQL Server};SERVER=.;DATABASE=HR;Trusted_Connection=yes')

# Tạo đối tượng cursor từ kết nối
cursor = conn.cursor()

# Xóa sạch dữ liệu trong bảng
cursor.execute("DELETE FROM Personal")

# Đảm bảo tất cả các thay đổi được lưu lại
conn.commit()
print('Done')

# Đóng kết nối
conn.close()
