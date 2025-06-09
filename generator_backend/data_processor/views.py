from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import NewGeneratorData
from .serializers import NewGeneratorDataSerializer

@api_view(['POST'])
def receive_generator_data(request):
    try:
        field_map = [
            ('control_switch_position', 1, {0: 'Off', 1: 'Auto', 2: 'Manual'}),
            ('genset_state', 1, {
                0: 'Off', 1: 'Stop', 2: 'Preheat', 3: 'Precrank', 4: 'Crank', 5: 'Starter Disconnect',
                6: 'PreRamp', 7: 'Ramp', 8: 'Running', 9: 'Fault Shutdown', 10: 'Prerun Setup',
                11: 'Runtime Setup', 12: 'Factory Test', 13: 'Waiting For Powerdown'
            }),
            ('current_fault', 1, None),
            ('current_fault_severity', 1, {0: 'None', 1: 'Warning', 2: 'Shutdown'}),
            ('genset_l1_n_rms_voltage', 1, None),
            ('genset_l2_n_rms_voltage', 1, None),
            ('genset_l3_n_rms_voltage', 1, None),
            ('genset_l1_l2_rms_voltage', 1, None),
            ('genset_l2_l3_rms_voltage', 1, None),
            ('genset_l3_l1_rms_voltage', 1, None),
            ('genset_l1_rms_current', 1, None),
            ('genset_l2_rms_current', 1, None),
            ('genset_l3_rms_current', 1, None),
            ('genset_l1_kw', 1, None),
            ('genset_l2_kw', 1, None),
            ('genset_l3_kw', 1, None),
            ('genset_total_kw', 1, None),
            ('genset_l1_kvar', 1, None),
            ('genset_l2_kvar', 1, None),
            ('genset_l3_kvar', 1, None),
            ('genset_total_kvar', 1, None),
            ('genset_l1_kva', 1, None),
            ('genset_l2_kva', 1, None),
            ('genset_l3_kva', 1, None),
            ('genset_total_kva', 1, None),
            ('genset_frequency', 0.01, None),
            ('battery_voltage', 0.001, None),
            ('oil_pressure', 0.1, None),
            ('coolant_temperature', 0.1, None),
            ('average_engine_speed', 0.125, None),
            ('start_attempts', 1, None),
            ('utility_l1_n_rms_voltage', 1, None),
            ('utility_l2_n_rms_voltage', 1, None),
            ('utility_l3_n_rms_voltage', 1, None),
            ('utility_l1_l2_rms_voltage', 1, None),
            ('utility_l2_l3_rms_voltage', 1, None),
            ('utility_l3_l1_rms_voltage', 1, None),
            ('charging_alternator_voltage', 0.001, None),
            ('modbus_remote_start', 1, {0: 'Inactive', 1: 'Active'}),
            ('modbus_fault_reset', 1, {0: 'Inactive', 1: 'Active'}),
            ('network_shutdown_modbus_command', 1, {0: 'Inactive', 1: 'Active'}),
        ]
        data_array = request.data.get('data')
        if not data_array or not isinstance(data_array, list) or len(data_array) != len(field_map):
            return Response({'error': 'Invalid data array.'}, status=status.HTTP_400_BAD_REQUEST)
        mapped_data = {}
        for idx, (field, multiplier, enum_dict) in enumerate(field_map):
            val = data_array[idx]
            try:
                val = float(val) * multiplier
            except Exception:
                pass
            if enum_dict is not None:
                try:
                    val = enum_dict.get(int(data_array[idx]), val)
                except Exception:
                    pass
            mapped_data[field] = val
        generator_data = NewGeneratorData(**mapped_data)
        generator_data.save()
        serializer = NewGeneratorDataSerializer(generator_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST) 