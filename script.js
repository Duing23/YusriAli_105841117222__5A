// Referensi elemen
const startBtn = document.getElementById("start-btn");
const startMenu = document.getElementById("start-menu");
const gameContainer = document.getElementById("game-container");
const rasenganBtn = document.getElementById("rasengan-btn");
const amaterasuBtn = document.getElementById("amaterasu-btn");
const rasenganBijuBtn = document.getElementById("rasengan-biju-btn");
const chidoriBtn = document.getElementById("chidori-btn");
const narutoHealth = document.getElementById("naruto-health");
const sasukeHealth = document.getElementById("sasuke-health");
const damageDisplay = document.getElementById("damage-display");
const effectSound = document.getElementById("effect-sound");
const backgroundMusic = document.getElementById("background-music");

startBtn.addEventListener("click", function () {
  startMenu.style.display = "none";
  gameContainer.style.display = "block";

  // Pastikan musik diputar setelah interaksi pengguna
  backgroundMusic.play().catch((error) => {
    // Jika autoplay gagal, atur volume dan coba mainkan setelah interaksi pengguna
    backgroundMusic.volume = 0.5;
    console.log(
      "Autoplay gagal, musik hanya bisa diputar setelah interaksi pengguna."
    );
  });

  // Selalu set volume agar tidak tergantung pada apakah autoplay berhasil atau tidak
  backgroundMusic.volume = 0.5; // Sesuaikan volume sesuai keinginan Anda
});
// Fungsi untuk menangani serangan
// Fungsi untuk menangani serangan
function handleAttack(
  effectImage,
  audioSrc,
  damageRange,
  attackerName,
  attackName,
  damageDescription,
  targetHealthId,
  attackColor
) {
  // Hapus overlay effect sebelumnya jika ada
  const existingOverlayEffect = document.getElementById("overlay-effect");
  if (existingOverlayEffect) {
    existingOverlayEffect.remove();
  }

  // Hapus damage display sebelumnya jika ada
  damageDisplay.style.display = "none";

  // Tambahkan efek overlay baru
  const overlayEffect = document.createElement("img");
  overlayEffect.src = effectImage;
  overlayEffect.id = "overlay-effect";
  document.body.appendChild(overlayEffect);
  overlayEffect.style.display = "block";

  // Mainkan suara efek serangan
  effectSound.src = audioSrc;
  effectSound.play();

  // Hitung damage setelah beberapa detik (tunggu efek selesai)
  setTimeout(() => {
    // Menghapus efek overlay setelah beberapa detik
    overlayEffect.remove();

    const damage =
      Math.floor(Math.random() * (damageRange[1] - damageRange[0] + 1)) +
      damageRange[0];
    let currentHealth = parseInt(
      document
        .getElementById(targetHealthId)
        .textContent.replace("Health: ", "")
    );
    currentHealth -= damage;
    document.getElementById(targetHealthId).textContent = `Health: ${Math.max(
      currentHealth,
      0
    )}`;

    // Tampilkan damage dengan penjelasan dan warna
    damageDisplay.style.display = "block";
    damageDisplay.innerHTML = `
      <strong style="color: ${attackColor};">${attackerName}</strong> menggunakan <strong>${attackName}</strong>!<br>
      <strong>Deskripsi:</strong> <span class="damage-description">${damageDescription}</span><br>
      <strong>Damage:</strong> Target menerima <span style="color: ${attackColor};">${damage}</span> damage!
    `;

    // Sembunyikan damage setelah beberapa detik
    setTimeout(() => {
      damageDisplay.style.display = "none";
    }, 10000);

    // Jika health habis, tampilkan pesan kemenangan
    if (currentHealth <= 0) {
      alert(`${attackerName} menang!`);
      document.getElementById(targetHealthId).textContent = "Health: 500"; // Reset health
    }
  }, 5000);
}

// Event listener untuk tombol serangan
rasenganBtn.addEventListener("click", () => {
  handleAttack(
    "efek/rasengan.png",
    "audio/rasengan.mp3",
    [20, 30],
    "Naruto",
    "Rasengan",
    "Rasengan adalah bola chakra yang berputar cepat. Serangan ini menghantam Sasuke dengan kekuatan besar, membuatnya kehilangan keseimbangan dan mundur beberapa langkah!",
    "sasuke-health",
    "#FF8C00" // Warna Oranye untuk Naruto
  );
});

amaterasuBtn.addEventListener("click", () => {
  handleAttack(
    "efek/amaterasu.png",
    "audio/amaterasu.mp3",
    [25, 35],
    "Sasuke",
    "Amaterasu",
    "Amaterasu adalah api hitam yang membakar segalanya hingga habis. Api ini menghantam tubuh Naruto, membakar chakra pelindungnya dan mengurangi kekuatannya secara drastis!",
    "naruto-health",
    "#800080" // Warna Ungu untuk Sasuke
  );
});

rasenganBijuBtn.addEventListener("click", () => {
  handleAttack(
    "efek/rasengan-biju.png",
    "audio/rasengan-biju.mp3",
    [30, 40],
    "Naruto",
    "Rasengan Biju",
    "Rasengan Biju adalah kombinasi chakra Bijuu dan Rasengan. Serangan ini meluncur dengan energi dahsyat, menyebabkan ledakan besar yang memukul Sasuke dengan keras!",
    "sasuke-health",
    "#FF8C00" // Warna Oranye untuk Naruto
  );
});

chidoriBtn.addEventListener("click", () => {
  handleAttack(
    "efek/chidori.png",
    "audio/chidori.mp3",
    [20, 30],
    "Sasuke",
    "Chidori",
    "Chidori adalah serangan petir yang tajam seperti tombak. Sasuke menyerang dengan kecepatan tinggi, menyebabkan luka mendalam pada Naruto!",
    "naruto-health",
    "#b300ff" // Warna Ungu untuk Sasuke
  );
});
