// ========================
// DATA PERTANYAAN
// ========================
const questions = [
  "Apakah warna urinmu cenderung kuning muda/bening dalam 24 jam terakhir?",
  "Apakah kamu BAK setidaknya 5–7 kali sehari?",
  "Apakah saat BAK tidak ada rasa nyeri, perih, atau panas?",
  "Apakah urinmu tidak berbau menyengat (di luar makanan tertentu)?",
  "Apakah kamu tidak pernah menahan BAK lebih dari 3–4 jam?"
];

// ========================
// STATE
// ========================
let currentQuestion = 0;
let yesCount = 0;
let noCount = 0;

// ========================
// ELEMENT SESUAI HTML
// ========================
const heading = document.getElementById("formHeading");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");

// ========================
// TAMPILKAN SOAL
// ========================
function showQuestion() {
  heading.textContent = questions[currentQuestion];
}

// ========================
// FUNGSI KETIKA MENJAWAB
// ========================
function answer(type) {
  if (type === "yes") yesCount++;
  else noCount++;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ========================
// EVENT LISTENER
// ========================
btnYes.addEventListener("click", () => answer("yes"));
btnNo.addEventListener("click", () => answer("no"));

// ========================
// HASIL INTERPRETASI
// ========================
function showResult() {
  let title = "";
  let desc = "";

  // PRIORITAS TERTINGGI: Jika "Tidak" ≥ 3
  if (noCount >= 3) {
    title = "Perlu Evaluasi Lebih Lanjut ⚠️";
    desc = 
      "Ada beberapa tanda yang memerlukan evaluasi lebih lanjut atau konsultasi. Kondisi ini bisa mengarah pada dehidrasi sedang–berat, iritasi kandung kemih, infeksi saluran kemih, atau masalah saluran kemih lainnya. " +
      "Kamu mungkin merasakan nyeri saat BAK, frekuensi BAK berubah drastis, urin berbau tajam, atau warnanya selalu pekat. " +
      "Jika disertai nyeri pinggang, demam, urin berdarah, atau gejala tidak membaik dalam 48–72 jam, segera periksakan diri ke fasilitas kesehatan. " +
      "Meningkatkan hidrasi dan mencatat gejala dalam 24 jam sangat disarankan.";
  
  // YES ≥ 4 → sehat
  } else if (yesCount >= 4) {
    title = "Urin Sehat ⭐";
    desc =
      "Kondisi urinmu tergolong sehat. Ini menunjukkan bahwa hidrasi harianmu cukup, frekuensi BAK normal, warna urin tidak pekat, dan tidak ada tanda awal iritasi atau infeksi. " +
      "Kebiasaan minum dan pola BAKmu kemungkinan sudah baik, sehingga fungsi ginjal juga bekerja optimal. " +
      "Kamu cukup mempertahankan pola minum teratur dan tetap memantau warna urin terutama saat cuaca panas atau aktivitas meningkat.";

  // YES ≤ 3 → perbaikan hidrasi
  } else if (yesCount <= 3) {
    title = "Perlu Perbaikan Hidrasi 💧";
    desc =
      "Kamu perlu memperbaiki hidrasi dan kebiasaan berkemih. Hasil ini biasanya menunjukkan bahwa kamu kurang minum, sering menahan BAK, atau frekuensi BAK lebih sedikit dari normal. " +
      "Urin pekat atau berbau menyengat menandakan ginjal bekerja lebih berat, dan risiko iritasi serta infeksi saluran kemih meningkat. " +
      "Disarankan untuk menambah asupan cairan, tidak menahan BAK lebih dari 3–4 jam, serta memperhatikan kebersihan area intim. " +
      "Pantau kembali perubahan dalam beberapa hari ke depan.";
  }
Swal.fire({
  title,
  html: `<p style="text-align:center; font-size:16px;">${desc}</p>`,
  icon: "info",
  showCancelButton: true,
  confirmButtonText: "Selesai",
  cancelButtonText: "Pelajari lebih lanjut",
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.cancel) {
    // Jika klik "Pelajari lebih lanjut"
    window.location.href = "../display/SiKandung.html";
  } else {
    // Jika klik "Selesai"
    resetAssessment();
  }
});

}

// ========================
// RESET ULANG
// ========================
function resetAssessment() {
  currentQuestion = 0;
  yesCount = 0;
  noCount = 0;
  showQuestion();
}

// ========================
// LOAD AWAL
// ========================
showQuestion();
