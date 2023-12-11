let students = [];

function addStudent() {
    const name = document.getElementById('name').value;
    const className = document.getElementById('class').value;
    const issue = document.getElementById('issue').value;
    const deductPoints = parseFloat(document.getElementById('deductPoints').value);

    const student = {
        name: name,
        class: className,
        issue: issue,
        deductPoints: deductPoints
    };

    students.push(student);
    displayStudents(); // Hiển thị danh sách học sinh sau khi thêm

    // Thêm học sinh vào hệ thống
    // Có thể gửi dữ liệu đến server để lưu trữ

    // Xóa dữ liệu từ các trường input
    document.getElementById('name').value = '';
    document.getElementById('class').value = '';
    document.getElementById('issue').value = '';
    document.getElementById('deductPoints').value = '';
}


function displayStudents() {
    const studentList = document.getElementById('studentList');
    // Xóa danh sách hiện tại
    while (studentList.firstChild) {
        studentList.removeChild(studentList.firstChild);
    }

    // Sắp xếp danh sách theo lớp
    students.sort((a, b) => a.class.localeCompare(b.class));

    // Hiển thị danh sách mới
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.issue}</td>
            <td>${student.deductPoints}</td>
        `;
        studentList.appendChild(row);
    });
}

function exportToExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(students);

    // Sắp xếp theo lớp và họ tên
    XLSX.utils.sheet_add_aoa(ws, [["Họ tên", "Lớp", "Lỗi mắc phải", "Điểm trừ"]], {origin: -1});
    XLSX.utils.sort_range(ws, [{s: {r: 1, c: 1}, e: {r: students.length + 1, c: 2}}]);

    // Tính tổng điểm
    const totalPoints = students.reduce((total, student) => total + student.deductPoints, 0);

    // Tạo cột tổng điểm và tính toán
    XLSX.utils.sheet_add_aoa(ws, [["Tổng điểm trừ", totalPoints]], {origin: students.length + 3});

    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách học sinh');
    XLSX.writeFile(wb, 'DanhSachHocSinh.xlsx');
}

const classes = {
    '10': ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'T1', 'T2', 'T3', 'T4', 'T5', 'A1', 'B'],
    '11': ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'T1', 'T2', 'T3', 'T4', 'T5', 'A1', 'B'],
    '12': ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'T1', 'T2', 'T3', 'T4', 'T5', 'A1', 'B']
};

const classSelect = document.getElementById('class');

// Tạo danh sách lớp khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
    generateClassOptions();
});

// Hàm để tạo danh sách lớp
function generateClassOptions() {
    for (const grade in classes) {
        classes[grade].forEach(cls => {
            const option = document.createElement('option');
            option.value = `Lớp ${grade}${cls}`;
            option.textContent = `Lớp ${grade}${cls}`;
            classSelect.appendChild(option);
        });
    }
}