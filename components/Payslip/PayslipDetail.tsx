import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { Alert, Platform } from "react-native";

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { currencyFormatter } from "../../utils/currencyFormatter";

interface PayslipDetailProps {
  payslip: {
    id: string;
    period: string;
    date: string;
    basicPay: number;
    allowances: number;
    deductions: number;
    netPay: number;
    status: string;
  };
  onClose: () => void;
}

const PayslipDetail = ({ payslip, onClose }: PayslipDetailProps) => {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const cardColor = backgroundColor;
  const boxColor = backgroundColor;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "#4CAF50";
      case "pending":
        return "#FFA000";
      case "processing":
        return "#2196F3";
      default:
        return "#666";
    }
  };

  const handleDownload = async () => {
    try {
      const html = `
        <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 24px;
                color: #222;
              }
              .header {
                display: flex;
                align-items: center;
                border-bottom: 2px solid #1976D2;
                margin-bottom: 24px;
              }
              .header-icon {
                font-size: 28px;
                color: #1976D2;
                margin-right: 12px;
              }
              .header-title {
                font-size: 24px;
                font-weight: bold;
              }
              .section {
                margin-bottom: 24px;
              }
              .section-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 12px;
                color: #1976D2;
              }
              .info-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 24px;
                margin-bottom: 12px;
              }
              .info-item {
                min-width: 180px;
                margin-bottom: 8px;
              }
              .label {
                font-size: 13px;
                color: #888;
              }
              .value {
                font-size: 15px;
                font-weight: 500;
              }
              .status-badge {
                display: inline-block;
                background: #4CAF50;
                color: #fff;
                border-radius: 4px;
                padding: 2px 12px;
                font-size: 13px;
                font-weight: 600;
                margin-top: 2px;
              }
              .box {
                background: #f5f7fa;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 8px;
              }
              .row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 6px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .row:last-child {
                border-bottom: none;
              }
              .row-label {
                font-size: 15px;
              }
              .row-value {
                font-size: 15px;
                font-weight: 500;
              }
              .total-row {
                font-size: 17px;
                font-weight: bold;
                color: #1976D2;
                margin-top: 8px;
              }
              .netpay-box {
                background: #e3f2fd;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
              }
              .netpay-value {
                font-size: 28px;
                font-weight: bold;
                color: #1976D2;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <span class="header-icon">📄</span>
              <span class="header-title">Payslip Details</span>
            </div>
            <div class="section">
              <div class="section-title">Payslip Information</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">Payslip ID</div>
                  <div class="value">${payslip.id}</div>
                </div>
                <div class="info-item">
                  <div class="label">Period</div>
                  <div class="value">${payslip.period}</div>
                </div>
                <div class="info-item">
                  <div class="label">Date</div>
                  <div class="value">${payslip.date}</div>
                </div>
                <div class="info-item">
                  <div class="label">Status</div>
                  <span class="status-badge">${payslip.status}</span>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Earnings</div>
              <div class="box">
                <div class="row">
                  <span class="row-label">Basic Pay</span>
                  <span class="row-value">${currencyFormatter.format(payslip.basicPay)}</span>
                </div>
                <div class="row">
                  <span class="row-label">Allowances</span>
                  <span class="row-value">${currencyFormatter.format(payslip.allowances)}</span>
                </div>
                <div class="row total-row">
                  <span>Total Earnings</span>
                  <span>${currencyFormatter.format(payslip.basicPay + payslip.allowances)}</span>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Deductions</div>
              <div class="box">
                <div class="row">
                  <span class="row-label">Total Deductions</span>
                  <span class="row-value">${currencyFormatter.format(payslip.deductions)}</span>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Net Pay</div>
              <div class="netpay-box">
                <span class="netpay-value">${currencyFormatter.format(payslip.netPay)}</span>
              </div>
            </div>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html });
      const fileName = `Payslip_${payslip.id}.pdf`;
      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            "application/pdf"
          ).then(async (uriSAF) => {
            await FileSystem.writeAsStringAsync(uriSAF, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Alert.alert("Success", "Payslip saved !");
          });
        } else {
          Alert.alert(
            "Permission denied",
            "Cannot save to Downloads folder without permission."
          );
        }
      } else {
        const destPath = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.moveAsync({ from: uri, to: destPath });
        Alert.alert(
          "Saved",
          `Payslip saved to app's document directory:\n${destPath}`
        );
      }
    } catch (error) {
      console.error("Error saving PDF:", error);
      Alert.alert("Error", "Failed to save payslip.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={24}
            color={iconColor}
          />
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Payslip Details
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Button
            mode="text"
            onPress={onClose}
            icon="close"
            textColor={iconColor}
          >
            Close
          </Button>
        </View>
      </View>

      <View style={[styles.content, { backgroundColor }]}>
        <View style={[styles.section, { backgroundColor: cardColor }]}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                styles.sectionTitle,
                { textAlign: "left", flex: 1, color: textColor },
              ]}
            >
              Payslip Information
            </Text>
            <IconButton
              icon="download"
              size={20}
              onPress={handleDownload}
              style={{ marginBottom: 4 }}
              iconColor={iconColor}
            />
          </View>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: textColor }]}>
                Payslip ID
              </Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {payslip.id}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: textColor }]}>
                Period
              </Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {payslip.period}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: textColor }]}>Date</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {payslip.date}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: textColor }]}>
                Status
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(payslip.status) },
                ]}
              >
                <Text style={styles.statusText}>{payslip.status}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: cardColor }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Earnings
          </Text>
          <View
            style={[styles.earningsContainer, { backgroundColor: boxColor }]}
          >
            <View style={styles.earningsRow}>
              <Text style={[styles.earningsLabel, { color: textColor }]}>
                Basic Pay
              </Text>
              <Text style={[styles.earningsValue, { color: textColor }]}>
                {currencyFormatter.format(payslip.basicPay)}
              </Text>
            </View>
            <View style={styles.earningsRow}>
              <Text style={[styles.earningsLabel, { color: textColor }]}>
                Allowances
              </Text>
              <Text style={[styles.earningsValue, { color: textColor }]}>
                {currencyFormatter.format(payslip.allowances)}
              </Text>
            </View>
            <View style={[styles.earningsRow, styles.totalRow]}>
              <Text style={[styles.totalLabel, { color: textColor }]}>
                Total Earnings
              </Text>
              <Text style={[styles.totalValue, { color: textColor }]}>
                {currencyFormatter.format(
                  payslip.basicPay + payslip.allowances
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: cardColor }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Deductions
          </Text>
          <View
            style={[styles.deductionsContainer, { backgroundColor: boxColor }]}
          >
            <View style={styles.deductionsRow}>
              <Text style={[styles.deductionsLabel, { color: textColor }]}>
                Total Deductions
              </Text>
              <Text style={[styles.deductionsValue, { color: textColor }]}>
                {currencyFormatter.format(payslip.deductions)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: cardColor }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Net Pay
          </Text>
          <View style={[styles.netPayContainer, { backgroundColor: boxColor }]}>
            <Text style={[styles.netPayValue, { color: textColor }]}>
              {currencyFormatter.format(payslip.netPay)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PayslipDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#112866",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  infoItem: {
    flex: 1,
    minWidth: "45%",
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  earningsContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 16,
  },
  earningsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  earningsLabel: {
    fontSize: 14,
    color: "#666",
  },
  earningsValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
  },
  deductionsContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 16,
  },
  deductionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  deductionsLabel: {
    fontSize: 14,
    color: "#666",
  },
  deductionsValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  netPayContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  netPayValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1976D2",
  },
  downloadButton: {
    backgroundColor: "#112866",
  },
});
