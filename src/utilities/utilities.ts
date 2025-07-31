export const isOnlyAlphabet = (string: string): boolean => {
    // Regular expression for checking only US alphabet letters and spaces
    const regex = /^[A-Za-z ]+$/;
    return regex.test(string);
}

export function validateEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function camelCaseToTitle(camelCaseStr: string): string {
    // Insert a space before each uppercase letter and trim any leading space
    const spacedStr = camelCaseStr.replace(/([A-Z])/g, ' $1').trim();

    // Split the string into words, capitalize the first letter of each, and join them with a space
    const titleStr = spacedStr
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return titleStr;
}

export const handleReactStateChange = <T,>(
    setFunction: React.Dispatch<React.SetStateAction<T>>,
    value: T
  ) => {
    setFunction(value);
  };

export const capitalLetters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface GenericObject {
  [key: string]: any;
}

export const calculateAverageProperty = (arr: GenericObject[], property: string): number => {
  if(arr.length === 0)return 0;
  const total = arr.reduce((sum, obj) => sum + obj[property], 0);
  return total / arr.length;
};

export const countNonEmptyArrays = <T>(objects: T[], property: keyof T): number => {
  return objects.filter(obj => Array.isArray(obj[property]) && (obj[property] as unknown as any[]).length > 0).length;
};

export const formatDate = (date: Date | string): string => {
  // Convert string to Date if necessary
  if (typeof date === "string") {
    date = new Date(date);
  }

  // Check if date is a valid Date object
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  // Array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Extracting the parts of the date
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Extracting and formatting the time
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${month} ${day}, ${year} at ${hours}:${minutesStr} ${ampm}`;
};

// Function to count words in a string
export const countWords = (str: string): number => {
  return str.trim().split(/\s+/).length;
}
