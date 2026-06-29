using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;


public class AnomalyInteraction : MonoBehaviour
{
    [Header("Data Anomali (Berubah Tiap Hari)")]
    public string namaAnomali;
    public string klasifikasi;
    public int energiDiekstrak;
    public int damageResiko;
    public bool isMentalDamage; 

    [Header("UI Reference")]
    public TextMeshPro teksInfo;

    private bool sedangBekerja = false;

    // FUNGSI INI YANG DICARI SAMA GAMEMANAGER
    public void GenerateAnomaliBaru(int hariSaatIni)
    {
        isMentalDamage = (Random.Range(0, 2) == 1); 

        if (hariSaatIni <= 4)
        {
            klasifikasi = "Tethered (Aman)";
            energiDiekstrak = Random.Range(15, 25);
            damageResiko = Random.Range(1, 3);
        }
        else if (hariSaatIni <= 8)
        {
            klasifikasi = "Restless (Waspada)";
            energiDiekstrak = Random.Range(20, 35);
            damageResiko = Random.Range(3, 5);
        }
        else if (hariSaatIni <= 12)
        {
            klasifikasi = "Volatile (Bahaya)";
            energiDiekstrak = Random.Range(30, 50);
            damageResiko = Random.Range(5, 8);
        }
        else 
        {
            klasifikasi = "APEX (Kiamat)";
            energiDiekstrak = Random.Range(40, 60);
            damageResiko = Random.Range(8, 15); 
        }

        namaAnomali = "Subjek-" + Random.Range(100, 999);
        UpdateUIAnomali();
    }

    void UpdateUIAnomali()
    {
        if (teksInfo != null)
        {
            string tipeSerang = isMentalDamage ? "Mental (SP)" : "Fisik (HP)";
            teksInfo.text = namaAnomali + "\nKelas: " + klasifikasi + "\nSerangan: " + tipeSerang + "\nResiko: " + damageResiko;
        }
    }

    void OnMouseDown()
    {
        if (GameManager.instance.karyawanTerpilih == null) return;

        if (!sedangBekerja)
        {
            StartCoroutine(ProsesKerja());
        }
    }

    IEnumerator ProsesKerja()
    {
        sedangBekerja = true;
        EmployeeManager pekerja = GameManager.instance.karyawanTerpilih;

        yield return new WaitForSeconds(3f);

        int peluang = Random.Range(1, 101);
        
        if (peluang <= pekerja.peluangSuksesDasar)
        {
            GameManager.instance.TambahEnergi(energiDiekstrak);
        }
        else 
        {
            if (isMentalDamage)
            {
                pekerja.TerimaDamageMental(damageResiko);
            }
            else
            {
                pekerja.TerimaDamageFisik(damageResiko);
            }

            if (pekerja.currentHP <= 0 && pekerja.currentSanity <= 0)
            {
                pekerja.GetComponent<SpriteRenderer>().color = Color.red; 
                GameManager.instance.karyawanTerpilih = null;
            }
        }

        sedangBekerja = false;
    }
}