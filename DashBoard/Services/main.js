export const getGenderRatio = async () => {
    try {
        let response = await axios.get(`http://localhost:8080/gender-ratio`);
        return response.data.data; // Trả về dữ liệu JSON
    } catch (e) {
        console.log(e);
    }
};

const updateGenderRatio = async () => {
    const data = await getGenderRatio();
    if (data) {
        const maleRatioElement = document.getElementById("male-ratio");
        const femaleRatioElement = document.getElementById("female-ratio");
        const totalUserElement = document.getElementById("total-user");

        const maleRatioElementPercent =
            document.getElementById("male-ratio-width");
        const femaleRatioElementPercent =
            document.getElementById("female-ratio-width");

        // Tính tỷ lệ nam và nữ từ dữ liệu JSON
        const malePercentage = data.male;
        const femalePercentage = data.female;
        const totalUser = data.total;

        // Cập nhật HTML với dữ liệu mới
        maleRatioElement.textContent = `${malePercentage}%`;
        maleRatioElementPercent.style.width = `${malePercentage}%`;

        femaleRatioElement.textContent = `${femalePercentage}%`;
        femaleRatioElementPercent.style.width = `${femalePercentage}%`;

        totalUserElement.textContent = `${totalUser}`;
    }
};

// Gọi hàm để cập nhật dữ liệu ban đầu
await updateGenderRatio();