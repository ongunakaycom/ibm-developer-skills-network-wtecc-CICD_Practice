document.addEventListener('DOMContentLoaded', function() {
  // Simulation state
  const startBtn = document.querySelector('#hero .btn-secondary');
  const terminalContent = document.getElementById('terminalContent');
  const startScreen = document.getElementById('startScreen');
  const simulationSection = document.getElementById('terminal');
  
  // Commands data - full CI/CD pipeline with Labs 02-06
  const commands = [
    {
      command: 'git push origin main',
      output: 'Enumerating objects: 5, done. Git push OK'
    },
    {
      command: 'gh workflow run "CI workflow"',
      output: '✅ Workflow triggered! Running on ubuntu-latest... 🐍 Python 3.9 environment setup 📦 Dependency install (pip) 🔧 Code Linting (flake8) ✅ Unit Testing & Coverage (pytest) 📊 CI Pass / Fail Status: PASSED. Build & Test passed successfully!'
    },
    {
      command: 'docker build -t ghcr.io/user/cicd-practice:v1 .',
      output: 'Step 1: Base image layer...done. Step 2: Install dependencies...done. Step 3: Copy application...done. Step 4: Multi-stage optimize...done. Successfully built and pushed to GHCR.'
    },
    {
      command: 'kubectl apply -f labs/02_add_git_trigger/',
      output: 'eventlistener.yaml created, triggerbinding.yaml created, triggertemplate.yaml created. ✅ Webhook listener active on port 8080.'
    },
    {
      command: 'curl -X POST http://localhost:8080 -H "Content-Type: application/json" -H "X-GitHub-Event: push" -d \'{"ref": "refs/heads/main", "repository": {"html_url": "https://github.com/ongunakaycom/ibm-developer-skills-network-wtecc-CICD_Practice.git"}} \'',
      output: 'Sending mock GitHub webhook payload... EventListener caught it! TriggerBinding parsed repo-url. TriggerTemplate created PipelineRun automatically.'
    },
    {
      command: 'kubectl get pipelineruns',
      output: 'NAME: cd-pipeline-run-xxxx STATUS: SUCCEEDED. Pipeline triggered automatically by Webhook!'
    },
    {
      command: 'kubectl describe pipelinerun cd-pipeline-run-xxxx',
      output: 'Tasks: clone (Completed), lint (Completed), tests (Completed), build (Completed), deploy (Completed). ✅ All Labs 02-06 simulated successfully!'
    }
  ];

  let currentCommand = 0;

  function typeWriter(element, text, speed = 20) {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return timer;
  }

  function addOutputLine(text, className = '') {
    const div = document.createElement('div');
    div.className = `output ${className}`;
    div.innerHTML = text.replace(/\n/g, '<br>');
    terminalContent.appendChild(div);
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }

  function addCommandLine(command) {
    const div = document.createElement('div');
    div.className = 'command';
    div.textContent = command;
    terminalContent.appendChild(div);
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }

  async function simulateCommand(cmd) {
    addCommandLine(cmd.command);
    
    const outputDiv = document.createElement('div');
    outputDiv.className = 'output success';
    outputDiv.innerHTML = cmd.output.replace(/\n/g, '<br>');
    terminalContent.appendChild(outputDiv);
    terminalContent.scrollTop = terminalContent.scrollHeight;
    
    // Wait for the typewriter to finish
    return new Promise(resolve => {
      setTimeout(resolve, (cmd.output.length * 15) + 300);
    });
  }

  async function runSimulation() {
    // Hide start screen, show terminal
    if (startScreen) {
      startScreen.style.display = 'none';
    }
    if (simulationSection) {
      simulationSection.style.display = 'block';
    }
    
    // Initial message
    addOutputLine('Starting DevOps Pipeline Simulation...');
    
    // Run each command sequentially
    for (let i = 0; i < commands.length; i++) {
      await simulateCommand(commands[i]);
      
      // Add small delay between commands
      if (i < commands.length - 1) {
        await new Promise(r => setTimeout(r, 500));
        addOutputLine(''); // empty line
      }
    }
    
    // Add final success badge
    const badgeDiv = document.createElement('div');
    badgeDiv.style.marginTop = '1rem';
    badgeDiv.style.padding = '0.5rem 1rem';
    badgeDiv.style.background = 'rgba(0, 212, 170, 0.15)';
    badgeDiv.style.border = '1px solid var(--accent)';
    badgeDiv.style.borderRadius = '20px';
    badgeDiv.style.display = 'inline-flex';
    badgeDiv.style.alignItems = 'center';
    badgeDiv.style.gap = '0.5rem';
    badgeDiv.innerHTML = '<span style="color: var(--success);">✓</span> Pipeline Status: <strong style="color: var(--success);">SUCCESS</strong>';
    terminalContent.appendChild(badgeDiv);
    
    // Re-enable start button after delay
    setTimeout(() => {
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = 'Run Simulation';
      }
    }, 1000);
  }

  // Button click handler
  if (startBtn) {
    startBtn.addEventListener('click', runSimulation);
  }
});