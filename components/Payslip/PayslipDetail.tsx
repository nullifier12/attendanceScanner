import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import { Alert, Platform, Share } from "react-native";

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const { isTablet } = useResponsive();

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
                  <span class="row-value">${currencyFormatter.format(
                    payslip.basicPay
                  )}</span>
                </div>
                <div class="row">
                  <span class="row-label">Allowances</span>
                  <span class="row-value">${currencyFormatter.format(
                    payslip.allowances
                  )}</span>
                </div>
                <div class="row total-row">
                  <span>Total Earnings</span>
                  <span>${currencyFormatter.format(
                    payslip.basicPay + payslip.allowances
                  )}</span>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Deductions</div>
              <div class="box">
                <div class="row">
                  <span class="row-label">Total Deductions</span>
                  <span class="row-value">${currencyFormatter.format(
                    payslip.deductions
                  )}</span>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Net Pay</div>
              <div class="netpay-box">
                <span class="netpay-value">${currencyFormatter.format(
                  payslip.netPay
                )}</span>
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
            Alert.alert("Success", "Payslip saved successfully!");
          });
        } else {
          Alert.alert(
            "Permission denied",
            "Cannot save to Downloads folder without permission."
          );
        }
      } else {
        try {
          const destPath = `${FileSystem.documentDirectory}${fileName}`;
          await FileSystem.moveAsync({ from: uri, to: destPath });

          const shareResult = await Share.share({
            url: destPath,
            title: `Payslip ${payslip.id}`,
            message: `Payslip for period ${payslip.period}`,
          });

          if (shareResult.action === Share.sharedAction) {
            Alert.alert("Success", "Payslip shared successfully!");
          } else if (shareResult.action === Share.dismissedAction) {
            Alert.alert("Cancelled", "Payslip sharing was cancelled.");
          }
        } catch (error) {
          console.error("Error sharing PDF on iOS:", error);

          // If sharing fails, just save to app directory
          const destPath = `${FileSystem.documentDirectory}${fileName}`;
          await FileSystem.moveAsync({ from: uri, to: destPath });
          Alert.alert(
            "Saved to App Directory",
            `Payslip saved to app's document directory:\n${destPath}`
          );
        }
      }
    } catch (error) {
      console.error("Error saving PDF:", error);
      Alert.alert("Error", "Failed to save payslip.");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }]}
      edges={["top", "left", "right"]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor },
          isTablet && styles.headerTablet,
        ]}
      >
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={isTablet ? 28 : 24}
            color={iconColor}
          />
          <Text
            style={[
              styles.headerTitle,
              { color: textColor },
              isTablet && styles.headerTitleTablet,
            ]}
          >
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

      <View
        style={[
          styles.content,
          { backgroundColor },
          isTablet && styles.contentTablet,
        ]}
      >
        <View
          style={[
            styles.section,
            { backgroundColor: cardColor },
            isTablet && styles.sectionTablet,
          ]}
        >
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
                isTablet && styles.sectionTitleTablet,
              ]}
            >
              Payslip Information
            </Text>
            <IconButton
              icon="download"
              size={isTablet ? 24 : 20}
              onPress={handleDownload}
              style={{ marginBottom: 4 }}
              iconColor={iconColor}
            />
          </View>
          <View style={[styles.infoGrid, isTablet && styles.infoGridTablet]}>
            <View style={[styles.infoItem, isTablet && styles.infoItemTablet]}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: textColor },
                  isTablet && styles.infoLabelTablet,
                ]}
              >
                Payslip ID
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: textColor },
                  isTablet && styles.infoValueTablet,
                ]}
              >
                {payslip.id}
              </Text>
            </View>
            <View style={[styles.infoItem, isTablet && styles.infoItemTablet]}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: textColor },
                  isTablet && styles.infoLabelTablet,
                ]}
              >
                Period
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: textColor },
                  isTablet && styles.infoValueTablet,
                ]}
              >
                {payslip.period}
              </Text>
            </View>
            <View style={[styles.infoItem, isTablet && styles.infoItemTablet]}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: textColor },
                  isTablet && styles.infoLabelTablet,
                ]}
              >
                Date
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: textColor },
                  isTablet && styles.infoValueTablet,
                ]}
              >
                {payslip.date}
              </Text>
            </View>
            <View style={[styles.infoItem, isTablet && styles.infoItemTablet]}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: textColor },
                  isTablet && styles.infoLabelTablet,
                ]}
              >
                Status
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(payslip.status) },
                  isTablet && styles.statusBadgeTablet,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    isTablet && styles.statusTextTablet,
                  ]}
                >
                  {payslip.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: cardColor },
            isTablet && styles.sectionTablet,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: textColor },
              isTablet && styles.sectionTitleTablet,
            ]}
          >
            Earnings
          </Text>
          <View
            style={[
              styles.earningsContainer,
              { backgroundColor: boxColor },
              isTablet && styles.earningsContainerTablet,
            ]}
          >
            <View style={styles.earningsRow}>
              <Text
                style={[
                  styles.earningsLabel,
                  { color: textColor },
                  isTablet && styles.earningsLabelTablet,
                ]}
              >
                Basic Pay
              </Text>
              <Text
                style={[
                  styles.earningsValue,
                  { color: textColor },
                  isTablet && styles.earningsValueTablet,
                ]}
              >
                {currencyFormatter.format(payslip.basicPay)}
              </Text>
            </View>
            <View style={styles.earningsRow}>
              <Text
                style={[
                  styles.earningsLabel,
                  { color: textColor },
                  isTablet && styles.earningsLabelTablet,
                ]}
              >
                Allowances
              </Text>
              <Text
                style={[
                  styles.earningsValue,
                  { color: textColor },
                  isTablet && styles.earningsValueTablet,
                ]}
              >
                {currencyFormatter.format(payslip.allowances)}
              </Text>
            </View>
            <View style={[styles.earningsRow, styles.totalRow]}>
              <Text
                style={[
                  styles.totalLabel,
                  { color: textColor },
                  isTablet && styles.totalLabelTablet,
                ]}
              >
                Total Earnings
              </Text>
              <Text
                style={[
                  styles.totalValue,
                  { color: textColor },
                  isTablet && styles.totalValueTablet,
                ]}
              >
                {currencyFormatter.format(
                  payslip.basicPay + payslip.allowances
                )}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: cardColor },
            isTablet && styles.sectionTablet,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: textColor },
              isTablet && styles.sectionTitleTablet,
            ]}
          >
            Deductions
          </Text>
          <View
            style={[
              styles.deductionsContainer,
              { backgroundColor: boxColor },
              isTablet && styles.deductionsContainerTablet,
            ]}
          >
            <View style={styles.deductionsRow}>
              <Text
                style={[
                  styles.deductionsLabel,
                  { color: textColor },
                  isTablet && styles.deductionsLabelTablet,
                ]}
              >
                Total Deductions
              </Text>
              <Text
                style={[
                  styles.deductionsValue,
                  { color: textColor },
                  isTablet && styles.deductionsValueTablet,
                ]}
              >
                {currencyFormatter.format(payslip.deductions)}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: cardColor },
            isTablet && styles.sectionTablet,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: textColor },
              isTablet && styles.sectionTitleTablet,
            ]}
          >
            Net Pay
          </Text>
          <View
            style={[
              styles.netPayContainer,
              { backgroundColor: boxColor },
              isTablet && styles.netPayContainerTablet,
            ]}
          >
            <Text
              style={[
                styles.netPayValue,
                { color: textColor },
                isTablet && styles.netPayValueTablet,
              ]}
            >
              {currencyFormatter.format(payslip.netPay)}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
  headerTablet: {
    padding: 24,
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
  headerTitleTablet: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentTablet: {
    padding: 24,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  section: {
    marginBottom: 24,
  },
  sectionTablet: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
    marginBottom: 16,
  },
  sectionTitleTablet: {
    fontSize: 18,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  infoGridTablet: {
    gap: 24,
  },
  infoItem: {
    flex: 1,
    minWidth: "45%",
  },
  infoItemTablet: {
    minWidth: "48%",
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  infoLabelTablet: {
    fontSize: 14,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  infoValueTablet: {
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusBadgeTablet: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  statusTextTablet: {
    fontSize: 14,
  },
  earningsContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 16,
  },
  earningsContainerTablet: {
    borderRadius: 12,
    padding: 20,
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
  earningsLabelTablet: {
    fontSize: 16,
  },
  earningsValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  earningsValueTablet: {
    fontSize: 16,
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
  totalLabelTablet: {
    fontSize: 18,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
  },
  totalValueTablet: {
    fontSize: 18,
  },
  deductionsContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 16,
  },
  deductionsContainerTablet: {
    borderRadius: 12,
    padding: 20,
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
  deductionsLabelTablet: {
    fontSize: 16,
  },
  deductionsValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  deductionsValueTablet: {
    fontSize: 16,
  },
  netPayContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  netPayContainerTablet: {
    borderRadius: 12,
    padding: 24,
  },
  netPayValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1976D2",
  },
  netPayValueTablet: {
    fontSize: 28,
  },
  downloadButton: {
    backgroundColor: "#112866",
  },
});
