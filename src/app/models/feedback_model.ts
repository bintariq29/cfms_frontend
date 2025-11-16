export interface Feedback {
    id: number;
    studentName: string;
    courseId: number;
    courseName: string;
    comment: string;
    rating: number;
    createdDate: string;
    attachment: string | null;
}