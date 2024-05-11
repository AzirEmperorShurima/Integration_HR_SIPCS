<!-- kill task mongo db in task manager -->
open terminal run lệnh mongod --replSet "rs"
mở tab terminal mới run lệnh mongosh  => để test coi đã ở chế độ replica chưa gõ rs.status()
=> nếu rs.status() ra màu đỏ thì chạy lệnh rs.initate()
-> lưu ý không đóng tab terminal