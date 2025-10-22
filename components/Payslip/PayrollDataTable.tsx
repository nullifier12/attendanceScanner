import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { currencyFormatter } from "../../utils/currencyFormatter";

interface PayrollData {
  category: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  total: number;
}

interface PayrollDataTableProps {
  data: PayrollData[];
  title: string;
}

const PayrollDataTable = ({ data, title }: PayrollDataTableProps) => {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const { isTablet } = useResponsive();

  const formatCurrency = (amount: number) => {
    return currencyFormatter.format(amount);
  };

  const getRowStyle = (category: string) => {
    if (category.includes("Gross Pay") || category.includes("Net Pay")) {
      return styles.totalRow;
    }
    if (category.includes("Total")) {
      return styles.subtotalRow;
    }
    return styles.regularRow;
  };

  const getTextStyle = (category: string) => {
    if (category.includes("Gross Pay") || category.includes("Net Pay")) {
      return [styles.totalText, { color: textColor }];
    }
    if (category.includes("Total")) {
      return [styles.subtotalText, { color: textColor }];
    }
    return [styles.regularText, { color: textColor }];
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        isTablet && styles.containerTablet,
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: textColor },
          isTablet && styles.titleTablet,
        ]}
      >
        {title}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title style={styles.categoryColumn}>
              <Text
                style={[
                  styles.headerText,
                  { color: textColor },
                  isTablet && styles.headerTextTablet,
                ]}
              >
                Category
              </Text>
            </DataTable.Title>
            <DataTable.Title style={styles.monthColumn}>
              <Text
                style={[
                  styles.headerText,
                  { color: textColor },
                  isTablet && styles.headerTextTablet,
                ]}
              >
                Jan
              </Text>
            </DataTable.Title>
            <DataTable.Title style={styles.monthColumn}>
              <Text
                style={[
                  styles.headerText,
                  { color: textColor },
                  isTablet && styles.headerTextTablet,
                ]}
              >
                Feb
              </Text>
            </DataTable.Title>
            <DataTable.Title style={styles.monthColumn}>
              <Text
                style={[
                  styles.headerText,
                  { color: textColor },
                  isTablet && styles.headerTextTablet,
                ]}
              >
                Mar
              </Text>
            </DataTable.Title>
            <DataTable.Title style={styles.monthColumn}>
              <Text
                style={[
                  styles.headerText,
                  { color: textColor },
                  isTablet && styles.headerTextTablet,
                ]}
              >
                Apr
              </Text>
            </DataTable.Title>
            <DataTable.Title style={styles.monthColumn}>
              <Text
                style={[
                  styles.headerText,
                  { color: textColor },
                  isTablet && styles.headerTextTablet,
                ]}
              >
                May
              </Text>
            </DataTable.Title>
            <DataTable.Title style={styles.monthColumn}>
              <Text
                style={[
                  styles.headerText,
                  { color: textColor },
                  isTablet && styles.headerTextTablet,
                ]}
              >
                Jun
              </Text>
            </DataTable.Title>
            <DataTable.Title style={styles.totalColumn}>
              <Text
                style={[
                  styles.headerText,
                  { color: textColor },
                  isTablet && styles.headerTextTablet,
                ]}
              >
                Total (Jan - Dec)
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          <ScrollView style={styles.tableBody}>
            {data.map((row, index) => (
              <DataTable.Row key={index} style={getRowStyle(row.category)}>
                <DataTable.Cell style={styles.categoryColumn}>
                  <Text style={getTextStyle(row.category)}>
                    {row.category}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.monthColumn}>
                  <Text style={getTextStyle(row.category)}>
                    {formatCurrency(row.jan)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.monthColumn}>
                  <Text style={getTextStyle(row.category)}>
                    {formatCurrency(row.feb)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.monthColumn}>
                  <Text style={getTextStyle(row.category)}>
                    {formatCurrency(row.mar)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.monthColumn}>
                  <Text style={getTextStyle(row.category)}>
                    {formatCurrency(row.apr)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.monthColumn}>
                  <Text style={getTextStyle(row.category)}>
                    {formatCurrency(row.may)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.monthColumn}>
                  <Text style={getTextStyle(row.category)}>
                    {formatCurrency(row.jun)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.totalColumn}>
                  <Text style={getTextStyle(row.category)}>
                    {formatCurrency(row.total)}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default PayrollDataTable;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  containerTablet: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  titleTablet: {
    fontSize: 18,
    marginBottom: 20,
  },
  table: {
    backgroundColor: "transparent",
  },
  tableBody: {
    maxHeight: 400,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "600",
  },
  headerTextTablet: {
    fontSize: 14,
  },
  regularText: {
    fontSize: 12,
  },
  regularTextTablet: {
    fontSize: 14,
  },
  subtotalText: {
    fontSize: 13,
    fontWeight: "500",
  },
  subtotalTextTablet: {
    fontSize: 15,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "600",
  },
  totalTextTablet: {
    fontSize: 16,
  },
  regularRow: {
    backgroundColor: "transparent",
  },
  subtotalRow: {
    backgroundColor: "#F5F5F5",
  },
  totalRow: {
    backgroundColor: "#E3F2FD",
  },
  // Column widths
  categoryColumn: {
    flex: 2,
    minWidth: 120,
  },
  monthColumn: {
    flex: 1,
    minWidth: 80,
  },
  totalColumn: {
    flex: 1,
    minWidth: 100,
  },
});
