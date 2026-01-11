// import { useState } from "react";
// import { Plus, Download, Trash2, Search, Upload } from "lucide-react";
// import { Note } from "../../types";

// const ManageNotes = () => {
//   const [notes, setNotes] = useState<Note[]>([
//     {
//       id: "1",
//       title: "Arrays and Linked Lists",
//       description:
//         "Complete guide on array operations and linked list implementation",
//       subject: "Data Structures",
//       class: "3rd Year",
//       section: "A",
//       fileUrl: "/notes/arrays.pdf",
//       fileType: "pdf",
//       uploadedBy: "Prof. Anita Sharma",
//       uploadedAt: "2024-01-15",
//     },
//     {
//       id: "2",
//       title: "Graph Theory Basics",
//       description:
//         "Introduction to graphs, traversal techniques, and applications",
//       subject: "Algorithms",
//       class: "3rd Year",
//       section: "A",
//       fileUrl: "/notes/graphs.pdf",
//       fileType: "pdf",
//       uploadedBy: "Prof. Anita Sharma",
//       uploadedAt: "2024-01-14",
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [, setShowUploadForm] = useState(false);

//   const filteredNotes = notes.filter(
//     (note) =>
//       note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       note.subject.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleDelete = (id: string) => {
//     setNotes(notes.filter((n) => n.id !== id));
//   };

//   return (
//     <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900">My Notes</h1>
//           <p className="text-gray-600 mt-2">
//             Manage and upload study materials
//           </p>
//         </div>
//         <button
//           onClick={() => setShowUploadForm(true)}
//           className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//         >
//           <Upload className="w-5 h-5" />
//           Upload Note
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by title or subject..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//         </div>
//       </div>

//       {/* Notes Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {filteredNotes.map((note) => (
//           <div
//             key={note.id}
//             className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">
//                   {note.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 mt-2">{note.description}</p>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-2 mb-4">
//               <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
//                 {note.subject}
//               </span>
//               <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
//                 {note.class}
//               </span>
//               <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
//                 {note.fileType.toUpperCase()}
//               </span>
//             </div>

//             <p className="text-xs text-gray-500 mb-4">
//               Uploaded on {new Date(note.uploadedAt).toLocaleDateString()}
//             </p>

//             <div className="flex gap-2">
//               <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium">
//                 <Download className="w-4 h-4" />
//                 Download
//               </button>
//               <button
//                 onClick={() => handleDelete(note.id)}
//                 className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredNotes.length === 0 && (
//         <div className="text-center py-10">
//           <p className="text-gray-600">No notes found</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageNotes;
