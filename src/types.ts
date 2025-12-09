// Day: supports 1–31 including padded versions
export type Day =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31";

// Month names
export type MonthName =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Sept"
  | "Oct"
  | "Nov"
  | "Dec"
  | "January"
  | "February"
  | "March"
  | "April"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

// Numeric month formats
export type MonthNumber =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";

// Year range: 1900–2099 (safe DOB range)
export type Year = `${19 | 20}${number}${number}`;

// A typed set of valid DOB string formats
export type DOBString =
  | `${Day}/${MonthNumber}/${Year}`
  | `${Day}-${MonthNumber}-${Year}`
  | `${Day}.${MonthNumber}.${Year}`
  | `${Day} ${MonthName} ${Year}`
  | `${Day} ${MonthName}, ${Year}`;

// Final DOB info object returned by parser
export interface DOBInfo {
  day: number;
  month: number;
  year: number;
  date: Date;
  isLeapYear: boolean;
  age: number;
}
