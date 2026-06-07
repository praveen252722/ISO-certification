"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { analytics, auditData, statusData } from "@/lib/demo-data";

export function RevenueAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={analytics}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.18} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ApplicationsBarChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={analytics}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="applications" fill="#0f766e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="certificates" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CertificatePieChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={statusData} dataKey="value" innerRadius={62} outerRadius={94} paddingAngle={3}>
          {statusData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function AuditLineChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={auditData}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} />
        <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
