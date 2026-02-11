import { useState } from 'react';
import { Database, Copy, Check, Download, Trash2, Play } from 'lucide-react';

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [uppercase, setUppercase] = useState(true);
  const [indentSize, setIndentSize] = useState(2);

  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN',
    'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'OUTER JOIN', 'FULL JOIN',
    'ON', 'AS', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
    'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
    'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'TRUNCATE',
    'CREATE INDEX', 'DROP INDEX', 'CREATE VIEW', 'DROP VIEW',
    'UNION', 'UNION ALL', 'EXCEPT', 'INTERSECT',
    'NULL', 'IS NULL', 'IS NOT NULL', 'EXISTS', 'NOT EXISTS',
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'DISTINCT',
    'ASC', 'DESC', 'NULLS FIRST', 'NULLS LAST',
    'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES', 'UNIQUE', 'INDEX',
    'BEGIN', 'COMMIT', 'ROLLBACK', 'TRANSACTION'
  ];

  const formatSql = () => {
    let formatted = input.trim();
    const indent = ' '.repeat(indentSize);

    // Normalize whitespace
    formatted = formatted.replace(/\s+/g, ' ');

    // Uppercase keywords
    if (uppercase) {
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.replace(/\s+/g, '\\s+')}\\b`, 'gi');
        formatted = formatted.replace(regex, keyword);
      });
    }

    // Add newlines before main keywords
    const mainKeywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'OUTER JOIN', 'ON', 'UNION', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM'];
    
    mainKeywords.forEach(keyword => {
      const regex = new RegExp(`\\s+(${keyword})\\b`, 'gi');
      formatted = formatted.replace(regex, `\n$1`);
    });

    // Indent after SELECT
    formatted = formatted.replace(/\bSELECT\b\s+/gi, 'SELECT\n' + indent);
    
    // Handle commas in SELECT
    formatted = formatted.replace(/,\s*/g, ',\n' + indent);

    // Add indent after WHERE, AND, OR
    formatted = formatted.replace(/\b(AND|OR)\b\s+/gi, '$1 ');

    // Clean up
    formatted = formatted.replace(/\n\s*\n/g, '\n');
    formatted = formatted.trim();

    setOutput(formatted);
  };

  const minifySql = () => {
    let minified = input.trim();
    minified = minified.replace(/\s+/g, ' ');
    minified = minified.replace(/\s*,\s*/g, ',');
    minified = minified.replace(/\s*\(\s*/g, '(');
    minified = minified.replace(/\s*\)\s*/g, ')');
    setOutput(minified);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSql = () => {
    const blob = new Blob([output], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(`select u.id, u.name, u.email, o.order_id, o.total_amount, p.product_name from users u inner join orders o on u.id = o.user_id left join order_items oi on o.order_id = oi.order_id left join products p on oi.product_id = p.id where u.status = 'active' and o.created_at >= '2024-01-01' and o.total_amount > 100 order by o.created_at desc limit 50`);
    setOutput('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">SQL Formatter</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Format and beautify SQL queries</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3 items-center">
          <button onClick={formatSql} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
            <Play className="w-4 h-4" /> Format
          </button>
          <button onClick={minifySql} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            🗜️ Minify
          </button>
          <button onClick={loadSample} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            📋 Sample
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 text-blue-500 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">Uppercase keywords</span>
            </label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">📥 Input SQL</span>
            <button
              onClick={() => { setInput(''); setOutput(''); }}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SQL query here..."
            className="w-full h-80 p-4 font-mono text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
          />
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">📤 Formatted SQL</span>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="p-1 text-gray-400 hover:text-blue-500">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button onClick={downloadSql} className="p-1 text-gray-400 hover:text-green-500">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <pre className="w-full h-80 p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-auto">
            {output || <span className="text-gray-400">Formatted SQL will appear here...</span>}
          </pre>
        </div>
      </div>

      {/* SQL Tips */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-white mb-4">💡 SQL Best Practices</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-medium text-green-700 dark:text-green-400">✅ Do</p>
            <ul className="text-green-600 dark:text-green-500 mt-2 space-y-1">
              <li>• Use meaningful table aliases</li>
              <li>• Specify columns instead of SELECT *</li>
              <li>• Use JOINs instead of subqueries when possible</li>
              <li>• Add indexes on frequently queried columns</li>
            </ul>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="font-medium text-red-700 dark:text-red-400">❌ Don't</p>
            <ul className="text-red-600 dark:text-red-500 mt-2 space-y-1">
              <li>• Use SELECT * in production</li>
              <li>• DELETE/UPDATE without WHERE clause</li>
              <li>• Use functions on indexed columns in WHERE</li>
              <li>• Ignore query execution plans</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
