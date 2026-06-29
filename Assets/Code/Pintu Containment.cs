using System.Collections;
using System.Collections.Generic;
using UnityEngine;



public class PintuContainment : MonoBehaviour
{
    // Fungsi ini dipanggil pas kamu nge-klik sprite tangga (pastikan ada BoxCollider2D-nya)
    void OnMouseDown()
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.BukaContainment();
        }
    }
}