import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  BookOpen, 
  Cloud, 
  Database, 
  Lock, 
  Network, 
  Server, 
  Settings, 
  Shield, 
  Zap,
  Brain,
  Globe,
  Users,
  DollarSign,
  Layers
} from "lucide-react"

const studySections = [
  {
    category: "Infrastructure et Services Fondamentaux",
    icon: Cloud,
    color: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-300",
    sections: [
      { title: "Cloud Computing", slug: "cloud_computing", description: "Concepts du cloud computing et infrastructure AWS" },
      { title: "Global Infrastructure", slug: "global_infrastructure", description: "Régions, Availability Zones, Edge Locations" },
      { title: "VPC", slug: "vpc", description: "Virtual Private Cloud et networking" },
    ]
  },
  {
    category: "Compute et Stockage",
    icon: Server,
    color: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-300",
    sections: [
      { title: "EC2", slug: "ec2", description: "Amazon EC2 - Instances virtuelles" },
      { title: "EC2 Storage", slug: "ec2_storage", description: "EBS, EFS, Instance Store" },
      { title: "Other Compute", slug: "other_compute", description: "Lambda, ECS, Fargate, Batch" },
      { title: "S3", slug: "s3", description: "Amazon S3 - Stockage objet" },
    ]
  },
  {
    category: "Base de Données et Analytics",
    icon: Database,
    color: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-300",
    sections: [
      { title: "Databases", slug: "databases", description: "RDS, DynamoDB, Redshift, ElastiCache" },
    ]
  },
  {
    category: "Mise à l'Échelle et Déploiement",
    icon: Zap,
    color: "bg-orange-100 dark:bg-orange-900",
    iconColor: "text-orange-600 dark:text-orange-300",
    sections: [
      { title: "ELB & ASG", slug: "elb_asg", description: "Elastic Load Balancing et Auto Scaling" },
      { title: "Deploying", slug: "deploying", description: "CloudFormation, CDK, Elastic Beanstalk" },
    ]
  },
  {
    category: "Intégration et Monitoring",
    icon: Settings,
    color: "bg-cyan-100 dark:bg-cyan-900",
    iconColor: "text-cyan-600 dark:text-cyan-300",
    sections: [
      { title: "Cloud Integration", slug: "cloud_integration", description: "SQS, SNS, Kinesis, MQ" },
      { title: "Cloud Monitoring", slug: "cloud_monitoring", description: "CloudWatch, CloudTrail, X-Ray" },
    ]
  },
  {
    category: "Sécurité et Conformité",
    icon: Shield,
    color: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-600 dark:text-red-300",
    sections: [
      { title: "IAM", slug: "iam", description: "Identity and Access Management" },
      { title: "Security & Compliance", slug: "security_compliance", description: "Shield, WAF, KMS, GuardDuty" },
      { title: "Advanced Identity", slug: "advanced_identity", description: "Cognito, STS, IAM Identity Center" },
    ]
  },
  {
    category: "Services Spécialisés",
    icon: Brain,
    color: "bg-pink-100 dark:bg-pink-900",
    iconColor: "text-pink-600 dark:text-pink-300",
    sections: [
      { title: "Machine Learning", slug: "machine_learning", description: "Rekognition, SageMaker, Comprehend" },
      { title: "Other AWS Services", slug: "other_aws_services", description: "WorkSpaces, IoT, AppSync, Amplify" },
    ]
  },
  {
    category: "Gestion et Architecture",
    icon: Layers,
    color: "bg-indigo-100 dark:bg-indigo-900",
    iconColor: "text-indigo-600 dark:text-indigo-300",
    sections: [
      { title: "Account Management & Billing", slug: "account_management_billing_support", description: "Organizations, Billing, Support Plans" },
      { title: "Architecting & Ecosystem", slug: "architecting_and_ecosystem", description: "Well-Architected Framework, Best Practices" },
    ]
  },
]

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 text-center duration-700">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            AWS Cloud Practitioner Study Guide
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Complete study notes for AWS Certified Cloud Practitioner (CLF-C02)
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link href="/">
              <button className="rounded-lg border border-blue-600 px-6 py-2 text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400">
                Back to Quizzes
              </button>
            </Link>
          </div>
        </div>

        <div className="space-y-12">
          {studySections.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <div 
                key={category.category}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${categoryIndex * 100}ms`, animationDuration: '500ms' }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}>
                    <Icon className={`h-6 w-6 ${category.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.sections.map((section, index) => (
                    <Card 
                      key={section.slug}
                      className="transition-all hover:scale-105 hover:shadow-xl"
                      style={{ animationDelay: `${(categoryIndex * 100) + (index * 50)}ms` }}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          {section.title}
                        </CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href={`/study/${section.slug}`}>
                          <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-transform hover:scale-105 hover:bg-blue-700">
                            Read Notes
                          </button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 rounded-lg border bg-white p-6 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold">Study Tips</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Read through each section thoroughly and take notes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Practice with the quiz exams after studying each topic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Focus on understanding concepts rather than memorization</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Review the Well-Architected Framework principles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Take multiple practice exams to test your knowledge</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
