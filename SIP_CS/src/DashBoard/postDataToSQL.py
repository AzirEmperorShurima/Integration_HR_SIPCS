import pyodbc
from faker import Faker

# Tạo đối tượng Faker
fake = Faker()

# Thiết lập kết nối với SQL Server
conn = pyodbc.connect('DRIVER={SQL Server};SERVER=.;DATABASE=HR;Trusted_Connection=yes')

# Tạo đối tượng cursor từ kết nối
cursor = conn.cursor()

# Tạo 500 dòng dữ liệu ngẫu nhiên
for _ in range(1):
    # Tạo dữ liệu giả
    employee_id = fake.random_number(digits=6, fix_len=True)
    first_name = fake.first_name()
    last_name = fake.last_name()
    middle_initial = fake.random_letter()
    address1 = fake.street_address()
    address2 = fake.secondary_address()
    city = fake.city()
    state = fake.state()
    zip = fake.zipcode()
    email = fake.email()
    phone_number = fake.phone_number()
    social_security_number = fake.ssn()
    drivers_license = fake.license_plate()
    marital_status = fake.random_element(elements=('Single', 'Married', 'Divorced'))
    gender = fake.random_int(min=0, max=1)
    shareholder_status = fake.random_int(min=0, max=1)
    benefit_plans = None
    ethnicity = fake.random_element(elements=('Kinh', 'Tày', 'Thái', 'Mường', 'Khơ Me', 'Hoa', 'Nùng', 'HMông'))

    # Thêm dữ liệu vào bảng
    cursor.execute("""
        INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, employee_id, first_name, last_name, middle_initial, address1, address2, city, state, zip, email, phone_number, social_security_number, drivers_license, marital_status, gender, shareholder_status, benefit_plans, ethnicity)

# Đảm bảo tất cả các thay đổi được lưu lại
conn.commit()
print('Done')
# Đóng kết nối
conn.close()
