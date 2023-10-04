import { ChangeEvent } from "react";

export type Task = {
  id?: number;
  title: string;
  description: string;
  due_date: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: string;
  assignee: number;
};

export type Contact = {
  id: number;
  username: string;
  email: string;
};

export type DefaultButtonProps = {
  text: string;
  className?: string;
  outlined?: boolean;
  block?: boolean;
  loading?: boolean;
  onClick?: () => void;
  icon?: string;
  bold?: boolean;
  iconSize?: string;
};

export type DefaultInputProps = {
  type: string;
  name: string;
  block?: boolean;
  required?: boolean;
  errorText?: string;
  maxLength?: number;
  icon?: string;
  placeholder?: string;
  label?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
};
