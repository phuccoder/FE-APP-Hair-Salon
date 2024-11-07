import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button, TouchableOpacity, Modal } from 'react-native';
import { userServices } from '../../../service/userServices';
import { UserDetailsDTO } from '../../../dtos/User.dto';
import { Appointment, AppointmentDetail } from '../../../dtos/Appointment.dto';

const AccountInfor: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetailsDTO | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        userServices.getCurrentUser().subscribe({
            next: (response) => {
                setUserDetails(response.data);
                setLoading(false);
            },
            error: (error) => {
                console.error("Error fetching user details:", error);
                setLoading(false);
            },
        });

        userServices.getAppointmentOfCurrentUser().subscribe({
            next: (response) => {
                if (response && Array.isArray(response)) {
                    setAppointments(response);
                } else {
                    console.error("No data in response");
                    setAppointments([]);
                }
            },
            error: (error) => {
                console.error("Error fetching appointments:", error);
                setAppointments([]);
            },
        });
    }, []);

    const formatPrice = (price: number | null): string => {
        if (price === null) return '';
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const getAppointmentStatusStyle = (status: string) => {
        switch (status) {
            case 'Đã thanh toán':
                return { color: '#28a745' }; 
            case 'CONFIRMED':
                return { color: '#ffc107'}; 
            case 'CANCELLED':
                return { color: '#dc3545'};
            default:
                return { color: '#333' };
        }
    };

    const openDetailModal = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setDetailModalVisible(true);
    };

    const closeDetailModal = () => {
        setDetailModalVisible(false);
        setSelectedAppointment(null);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>User Information</Text>
                {userDetails && (
                    <>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Name:</Text>
                            <Text style={styles.value}>{userDetails.accountName}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Phone:</Text>
                            <Text style={styles.value}>{userDetails.accountPhone}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{userDetails.accountEmail}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={styles.value}>{userDetails.accountStatus ? 'Active' : 'Inactive'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Email Verified:</Text>
                            <Text style={styles.value}>{userDetails.emailVerified ? 'Yes' : 'No'}</Text>
                        </View>
                    </>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Appointment History</Text>
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <View key={appointment.appointmentID} style={styles.appointmentCard}>
                            <Text style={styles.appointmentText}>
                                {appointment.appointmentDetails[0]?.serviceName || appointment.appointmentDetails[0]?.comboName}
                            </Text>
                            <Text style={styles.appointmentText}>Date: {appointment.appointmentDate}</Text>
                            <Text style={[styles.appointmentText, getAppointmentStatusStyle(appointment.appointmentStatus)]}>
                                Status: {appointment.appointmentStatus === 'Đã thanh toán' ? 'PAID' : appointment.appointmentStatus}
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => openDetailModal(appointment)} style={styles.detailButton}>
                                    <Text style={styles.buttonText}>Detail</Text>
                                </TouchableOpacity>
                                {appointment.appointmentStatus !== 'Đã thanh toán' && appointment.appointmentStatus !== 'CANCELLED' && (
                                    <TouchableOpacity onPress={() => alert('Processing payment...')} style={styles.paymentButton}>
                                        <Text style={styles.buttonText}>Payment</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noAppointmentsText}>No appointments found.</Text>
                )}
            </View>

            {selectedAppointment && (
                <Modal visible={detailModalVisible} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Appointment Details</Text>
                            {selectedAppointment.appointmentDetails.map((detail) => (
                                <View key={detail.appointmentDetailID} style={styles.detailRow}>
                                    <Text style={styles.detailText}>Service/Combo: {detail.serviceName || detail.comboName}</Text>
                                    <Text style={styles.detailText}>Price: {formatPrice(detail.servicePrice) || formatPrice(detail.comboPrice)}</Text> 
                                </View>
                            ))}
                            <Button title="Close" onPress={closeDetailModal} />
                        </View>
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 16,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    section: {
        marginTop: 20,
    },
    appointmentCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    appointmentText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    detailButton: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    paymentButton: {
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    detailRow: {
        marginBottom: 8,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    noAppointmentsText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default AccountInfor;
