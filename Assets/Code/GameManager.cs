using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class GameManager : MonoBehaviour
{
    public static GameManager instance;

    [Header("Status Permainan")]
    public int hariSaatIni = 1;
    public int energiSaatIni = 0;
    public int targetEnergiPerHari = 100;
    
    [Header("Manajemen Karyawan")]
    public EmployeeManager[] daftarKaryawan; 
    public int budgetPerusahaan = 0; 
    public EmployeeManager karyawanTerpilih; 

    [Header("Manajemen Anomali")]
    public AnomalyInteraction anomaliFasilitas; 

    // --- TAMBAHAN BARU: Panel Containment ---
    [Header("UI Navigasi Ruangan")]
    public GameObject panelContainment; 

    [Header("UI Reference")]
    public TextMeshProUGUI teksHari;
    public TextMeshProUGUI teksEnergi;
    public GameObject panelEvaluasi; 
    public TextMeshProUGUI teksRank;
    public TextMeshProUGUI teksBudget;

    [Header("UI Ending")]
    public GameObject panelEnding;
    public TextMeshProUGUI teksJudulEnding;
    public TextMeshProUGUI teksCeritaEnding;

    void Awake()
    {
        if (instance == null) instance = this;
    }

    void Start()
    {
        UpdateUI();
        panelEvaluasi.SetActive(false);
        if (panelEnding != null) panelEnding.SetActive(false);
        if (panelContainment != null) panelContainment.SetActive(false); // Pastikan Containment nutup di awal
        if (anomaliFasilitas != null) anomaliFasilitas.GenerateAnomaliBaru(hariSaatIni);
    }

    // --- FUNGSI NAVIGASI BARU ---
    public void BukaContainment()
    {
        if (panelContainment != null) panelContainment.SetActive(true);
        Debug.Log("Memasuki Ruang Containment...");
    }

    public void TutupContainment()
    {
        if (panelContainment != null) panelContainment.SetActive(false);
    }

    public void TambahEnergi(int jumlah)
    {
        energiSaatIni += jumlah;
        UpdateUI();

        if (energiSaatIni >= targetEnergiPerHari)
        {
            KalkulasiRankEvaluasi(); 
        }
    }

    void KalkulasiRankEvaluasi()
    {
        // Tutup otomatis layar containment saat evaluasi muncul
        if (panelContainment != null) panelContainment.SetActive(false);

        int karyawanHidup = 0;
        float totalKesehatan = 0f; 

        foreach (EmployeeManager karyawan in daftarKaryawan)
        {
            if (karyawan.currentHP > 0 || karyawan.currentSanity > 0)
            {
                karyawanHidup++;
                float persenHP = (float)karyawan.currentHP / karyawan.maxHP;
                float persenSP = (float)karyawan.currentSanity / karyawan.maxSanity;
                totalKesehatan += (persenHP + persenSP) / 2f; 
            }
        }

        if (karyawanHidup == 0)
        {
            PicuEnding(false); 
            return; 
        }

        string hasilRank = ""; int poinDidapat = 0;
        if (karyawanHidup == daftarKaryawan.Length) 
        {
            float rataRataSehat = totalKesehatan / daftarKaryawan.Length;
            if (rataRataSehat >= 0.8f) { hasilRank = "S"; poinDidapat = 5; }
            else { hasilRank = "A"; poinDidapat = 3; }
        }
        else if (karyawanHidup == daftarKaryawan.Length - 1) { hasilRank = "B"; poinDidapat = 1; }
        else { hasilRank = "D"; poinDidapat = -2; }

        budgetPerusahaan += poinDidapat;
        if (budgetPerusahaan < 0) budgetPerusahaan = 0; 

        teksRank.text = "RANK HARI INI: " + hasilRank;
        UpdateTeksBudget();
        panelEvaluasi.SetActive(true);
    }

    public void BeliUpgradeHP()
    {
        if (budgetPerusahaan > 0 && karyawanTerpilih != null && karyawanTerpilih.levelHP < 10)
        {
            budgetPerusahaan--; karyawanTerpilih.UpgradeHP(); UpdateTeksBudget();
        }
    }

    public void BeliUpgradeSP()
    {
        if (budgetPerusahaan > 0 && karyawanTerpilih != null && karyawanTerpilih.levelSanity < 10)
        {
            budgetPerusahaan--; karyawanTerpilih.UpgradeSanity(); UpdateTeksBudget();
        }
    }

    public void BeliUpgradeAgility()
    {
        if (budgetPerusahaan > 0 && karyawanTerpilih != null && karyawanTerpilih.levelAgility < 10)
        {
            budgetPerusahaan--; karyawanTerpilih.UpgradeAgility(); UpdateTeksBudget();
        }
    }

    void UpdateTeksBudget()
    {
        teksBudget.text = "Pilih Karyawan (Klik Karyawan) untuk di-upgrade.\nSisa Budget Perusahaan: " + budgetPerusahaan;
    }

    public void TombolLanjutHari() 
    {
        panelEvaluasi.SetActive(false);
        hariSaatIni++;

        if (hariSaatIni > 14)
        {
            PicuEnding(true); 
        }
        else
        {
            energiSaatIni = 0; 
            UpdateUI();
            if (anomaliFasilitas != null) anomaliFasilitas.GenerateAnomaliBaru(hariSaatIni);
        }
    }

    public void PicuEnding(bool isMenang)
    {
        panelEnding.SetActive(true);
        if (isMenang)
        {
            teksJudulEnding.text = "PENGABDIAN SELESAI\n(TRUE ENDING)";
            teksJudulEnding.color = Color.green;
            teksCeritaEnding.text = "Reaktor stabil. Anda berhasil memeras anomali tingkat APEX dan membongkar rahasia korporat. Anda selamat dari siklus 14 hari ini.";
        }
        else
        {
            teksJudulEnding.text = "EVALUASI MANAJER: TERMINATED\n(BAD ENDING)";
            teksJudulEnding.color = Color.red;
            teksCeritaEnding.text = "Semua aset karyawan hancur. Reaktor kelebihan muatan. Fasilitas ditutup secara permanen dengan Anda terjebak di dalamnya.";
        }
    }

    void UpdateUI()
    {
        teksHari.text = "Hari ke-" + hariSaatIni;
        teksEnergi.text = "Energi: " + energiSaatIni + " / " + targetEnergiPerHari;
    }

    public void KurangiHP(int damage)
    {
        foreach (EmployeeManager karyawan in daftarKaryawan)
        {
            if (karyawan.currentHP > 0)
            {
                karyawan.TerimaDamageFisik(damage);
                return; 
            }
        }
    }
}