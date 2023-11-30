import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function GET(req: Request) {
  try {
    const employees = await prisma.employees.findFirst({
      where: {
        idemployees: 1,
      },
      include: {
        employees_education: {
          include: {
            institutions: true,
          },
        },
        employees_relatives: {
          include: {
            Relatives: true,
          },
        },
        employees_ext_involvements: {
          include: {
            institutions: true,
          },
        },
        employees_has_trainings: {
          include: {
            trainings: true,
          },
        },
        employees_prof_eligibility: {
          include: {
            professional_exams: true,
          },
        },
        employees_unitassignments: {
          include: {
            departments: true,
          },
        },
        service_records: {
          include: {
            contract_types: true,
            job_positions: true,
          },
        },
        skills_has_employees: {
          include: {
            skills: true,
          },
        },
      },
    });

    return NextResponse.json({ ok: true, employees }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

/* 
MYSQL QUERY EQUIVALENT

SELECT *
FROM employees e
LEFT JOIN employees_education ee ON e.idemployees = ee.employees_idemployees
LEFT JOIN institutions ie ON ee.institutions_idinstitutions = ie.idinstitutions
LEFT JOIN employees_relatives er ON e.idemployees = er.employees_idemployees
LEFT JOIN Relatives r ON er.Relatives_idrelatives = r.idrelatives
LEFT JOIN employees_ext_involvements ei ON e.idemployees = ei.employees_idemployees
LEFT JOIN institutions ie2 ON ei.institutions_idinstitutions = ie2.idinstitutions
LEFT JOIN employees_has_trainings eht ON e.idemployees = eht.employees_idemployees
LEFT JOIN trainings t ON eht.trainings_idtrainings = t.idtrainings
LEFT JOIN employees_prof_eligibility epe ON e.idemployees = epe.employees_idemployees
LEFT JOIN professional_exams pe ON epe.professional_exams_idprofessional_exams = pe.idprofessional_exams
LEFT JOIN employees_unitassignments eu ON e.idemployees = eu.employees_idemployees
LEFT JOIN departments d ON eu.departments_iddepartments = d.iddepartments
LEFT JOIN service_records sr ON e.idemployees = sr.employees_idemployees
LEFT JOIN contract_types ct ON sr.contract_types_idcontract_types = ct.idcontract_types
LEFT JOIN job_positions jp ON sr.job_positions_idjob_positions = jp.idjob_positions
LEFT JOIN skills_has_employees she ON e.idemployees = she.employees_idemployees
LEFT JOIN skills s ON she.skills_idskills = s.idskills
WHERE e.idemployees = 1;


*/
