// menampilkan alert
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className} w-100`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 5000);
}

// local storage
function showData() {
  let mahasiswa = JSON.parse(localStorage.getItem("mahasiswa")) || [];
  ujiTable();

  let html = "";
  mahasiswa.forEach((elemen, index) => {
    html += `<tr><th>${index + 1}</th>
    <td>${elemen.nama}</td>
    <td>${elemen.npm}</td>
    <td>${elemen.kelas}</td>
    <td>${elemen.jurusan}</td>
    <td>
      <button class="btn btn-warning btn-sm edit" onclick="updateData(${index})">Edit</button>
      <button class="btn btn-danger btn-sm delete" onclick="deleteData(${index})">Delete</button>
    </td></tr>
  `;
    document.getElementById("list-mahasiswa").innerHTML = html;
  });
}

function ujiTable() {
  const table = document.getElementsByClassName("table")[0];
  if (localStorage.getItem("mahasiswa") === null || localStorage.getItem("mahasiswa") === "[]") {
    table.setAttribute("hidden", "");
  } else {
    table.removeAttribute("hidden");
  }
}

// load data
document.onload = showData();

// untuk data
const kirim = document.getElementById("kirim");
kirim.addEventListener("click", () => {
  const nama = document.getElementById("nama").value;
  const npm = document.getElementById("npm").value;
  const kelas = document.getElementById("kelas").value;
  const jurusan = document.getElementById("jurusan").value;

  if (nama !== "" || npm !== "" || kelas !== "" || jurusan !== "") {
    let mahasiswa = JSON.parse(localStorage.getItem("mahasiswa")) || [];

    mahasiswa.push({
      nama: nama,
      npm: npm,
      kelas: kelas,
      jurusan: jurusan,
    });

    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
    showData();
    hapusForm();
    showAlert(`Mahasiswa dengan nama "${nama}" Telah Ditambahkan`, "success");
  }
});

// hapus form
function hapusForm() {
  document.getElementById("nama").value = "";
  document.getElementById("npm").value = "";
  document.getElementById("kelas").value = "";
  document.getElementById("jurusan").value = "";
}

// hapus data di local storage
function deleteData(index) {
  let mahasiswa = JSON.parse(localStorage.getItem("mahasiswa")) || [];
  showAlert(`Data mahasiswa dengan nama "${mahasiswa[index].nama}" berhasil dihapus`, "danger");
  mahasiswa.splice(index, 1);
  const listMahsiswa = document.querySelector("tbody#list-mahasiswa tr");
  listMahsiswa.innerHTML = null;
  localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
  showData();
}

function updateData(index) {
  document.getElementById("kirim").style.display = "none";
  document.getElementById("edit").style.display = "block";
  let mahasiswa = JSON.parse(localStorage.getItem("mahasiswa")) || [];
  document.getElementById("nama").value = mahasiswa[index].nama;
  document.getElementById("npm").value = mahasiswa[index].npm;
  document.getElementById("kelas").value = mahasiswa[index].kelas;
  document.getElementById("jurusan").value = mahasiswa[index].jurusan;

  document.getElementById("edit").onclick = function () {
    mahasiswa[index].nama = document.getElementById("nama").value;
    mahasiswa[index].npm = document.getElementById("npm").value;
    mahasiswa[index].kelas = document.getElementById("kelas").value;
    mahasiswa[index].jurusan = document.getElementById("jurusan").value;

    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
    showData();
    hapusForm();

    document.getElementById("kirim").style.display = "block";
    document.getElementById("edit").style.display = "none";
    showAlert(`Data mahasiswa dengan nama "${mahasiswa[index].nama}" telah berhasil diubah`, "info");
  };
}
