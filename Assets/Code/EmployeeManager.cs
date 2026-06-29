using System.Collections;
using System.Collections.Generic;

using UnityEngine;
using TMPro;

public class EmployeeManager : MonoBehaviour
{
    public static EmployeeManager instance;

    [Header("Level Status (Maks 10)")]
    public int levelHP = 1;
    public int levelSanity = 1;
    public int levelAgility = 1;

    [Header("Nilai Aktual")]
    public int maxHP;
    public int currentHP;
    public int maxSanity;
    public int currentSanity;
    public int peluangSuksesDasar; 

    [Header("UI Reference")]
    public TextMeshPro teksStatus; 
    public SpriteRenderer spriteRenderer;

    void Awake()
    {
        if (instance == null) instance = this;
    }

    void Start()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();
        KalkulasiStatus();
        currentHP = maxHP;
        currentSanity = maxSanity;
        UpdateUIIndikator(); 
    }

    public void KalkulasiStatus()
    {
        maxHP = levelHP * 10; 
        maxSanity = levelSanity * 10; 
        peluangSuksesDasar = 50 + (levelAgility * 5); 
    }

    public void UpdateUIIndikator()
    {
        if (teksStatus != null)
        {
            teksStatus.text = gameObject.name + "\nHP: " + currentHP + "/" + maxHP + "\nSP: " + currentSanity + "/" + maxSanity;
        }
    }

    // --- FUNGSI UPGRADE (Tanpa Pengecekan Poin) ---
    public void UpgradeHP()
    {
        if (levelHP < 10) { levelHP++; KalkulasiStatus(); currentHP = maxHP; UpdateUIIndikator(); }
    }

    public void UpgradeSanity()
    {
        if (levelSanity < 10) { levelSanity++; KalkulasiStatus(); currentSanity = maxSanity; UpdateUIIndikator(); }
    }

    public void UpgradeAgility()
    {
        if (levelAgility < 10) { levelAgility++; KalkulasiStatus(); UpdateUIIndikator(); }
    }

    // --- FUNGSI MENERIMA DAMAGE ---
    public void TerimaDamageFisik(int damage)
    {
        currentHP -= damage;
        if (currentHP <= 0) currentHP = 0;
        UpdateUIIndikator(); 
    }

    public void TerimaDamageMental(int damage)
    {
        currentSanity -= damage;
        if (currentSanity <= 0) currentSanity = 0;
        UpdateUIIndikator(); 
    }

    void OnMouseDown()
    {
        if (currentHP <= 0 && currentSanity <= 0) return;

        foreach (EmployeeManager k in GameManager.instance.daftarKaryawan)
        {
            if (k != null && k.spriteRenderer != null) k.spriteRenderer.color = Color.white;
        }

        GameManager.instance.karyawanTerpilih = this;
        spriteRenderer.color = Color.yellow;
    }
}