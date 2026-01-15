import { useNavigate } from "react-router-dom";

const TOPICS = [
  { name: "DSA", slug: "dsa" },
  { name: "C", slug: "c" },
  { name: "C++", slug: "cpp" },
  { name: "Java", slug: "java" },
  { name: "Python", slug: "python" },
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Angular", slug: "angular" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Express.js", slug: "express" },
  { name: "Spring Boot", slug: "spring-boot" },
  { name: "SQL", slug: "sql" },
  { name: "NoSQL", slug: "nosql" },
  { name: "Data Science", slug: "data-science" },
  { name: "Machine Learning", slug: "machine-learning" },
  { name: "Deep Learning", slug: "deep-learning" },
  { name: "AI", slug: "artificial-intelligence" },
  { name: "Cloud Computing", slug: "cloud" },
  { name: "AWS", slug: "aws" },
  { name: "Docker", slug: "docker" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Linux", slug: "linux" },
  { name: "DevOps", slug: "devops" },
  { name: "System Design", slug: "system-design" },
  { name: "Cyber Security", slug: "cyber-security" },
  { name: "Blockchain", slug: "blockchain" },
];


export default function TopicBar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40 scrollbar-hide">
      <div className="max-w-7xl mx-auto px-4 scrollbar-hide">
        <div className="flex gap-6 overflow-x-auto py-3 scrollbar-hide">
          {TOPICS.map((topic) => (
            <button
              key={topic.slug}
              onClick={() => navigate(`/topic/${topic.slug}`)}
              className="whitespace-nowrap text-sm font-semibold text-gray-700 hover:text-blue-600 transition relative group"
            >
              {topic.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
