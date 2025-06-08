from django.db import models

# Create your models here.

class GeneratorData(models.Model):
    # Generator Voltages (Volts)
    L1 = models.FloatField(null=True, blank=True)  # L1-N
    L2 = models.FloatField(null=True, blank=True)  # L2-N
    L3 = models.FloatField(null=True, blank=True)  # L3-N
    GEN = models.FloatField(null=True, blank=True) # GEN
    L1_L2 = models.FloatField(null=True, blank=True)  # L1-L2
    L2_L3 = models.FloatField(null=True, blank=True)  # L2-L3
    L3_L1 = models.FloatField(null=True, blank=True)  # L3-L1

    # Generator Currents (Amps)
    ampL1 = models.FloatField(null=True, blank=True)
    ampL2 = models.FloatField(null=True, blank=True)
    ampL3 = models.FloatField(null=True, blank=True)

    # Power (kW, kVA, kvar)
    kW = models.FloatField(null=True, blank=True)
    kVA = models.FloatField(null=True, blank=True)
    kvar = models.FloatField(null=True, blank=True)

    # Totals (kWh, kVAh, kvarh)
    kWh = models.FloatField(null=True, blank=True)
    kVAh = models.FloatField(null=True, blank=True)
    kvarh = models.FloatField(null=True, blank=True)

    # Engine Data
    oilPressure = models.FloatField(null=True, blank=True)  # PSI
    coolantTemp = models.FloatField(null=True, blank=True)  # °C
    fuelLevel = models.FloatField(null=True, blank=True)    # %
    batteryVoltage = models.FloatField(null=True, blank=True)  # V
    chargeAltVoltage = models.FloatField(null=True, blank=True)  # V

    # Status (Boolean or Integer)
    statusStop = models.BooleanField(default=False)
    statusStart = models.BooleanField(default=False)
    statusAuto = models.BooleanField(default=False)
    statusManual = models.BooleanField(default=False)

    # Alarm/Other fields (add as needed)
    lastShutdownTime = models.DateTimeField(null=True, blank=True)
    electricTrip = models.CharField(max_length=100, null=True, blank=True)

    # Timestamp
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"GeneratorData at {self.timestamp}"
